# matchup/dbhandlers.py

from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from channels.generic.websocket import SyncConsumer
from channels.db import database_sync_to_async
from rest_framework import status

import json

from .model_interactions.handlers import \
    join_match, leave_match, round_started, set_user_move, \
    set_user_ready_status, both_users_ready, evaluate_round, \
    user_first_to_ready, set_round_as_started
from .utils import wait_then_call, get_time_seconds

ROUND_TIMER = 5

class MatchmakingConsumer(AsyncWebsocketConsumer):
    #------------------------------------------------------------------
    # Web Socket Communicators
    #------------------------------------------------------------------
    async def connect(self):
        """
        Called when first connecting to the socket. Finds a player an appropriate room to join.
        """
        # find a match
        self.user = self.scope['user']

        self.match_id = await join_match(self.user.id)
        self.match_group_id = 'game_%s' % self.match_id

        # Join match's channel group
        await self.channel_layer.group_add(
            self.match_group_id,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Ensures proper cleanup upon leaving.
        """
        # Leave match's channel group
        await leave_match(self.match_id, self.user.id)
        await self.channel_layer.group_discard(
            self.match_group_id,
            self.channel_name
        )

    async def receive(self, received_data):
        """
        Parses incoming requests along the Websocket, and passes to the appropriate command handler.
        """
        data = json.loads(received_data)
        if not await self._request_valid(data):
            return

        command = data['command']

        await self.dispatch_command[command](self, data)

    #------------------------------------------------------------------
    # Utilities
    #------------------------------------------------------------------
    async def _send_response(self, data = {}, status=status.HTTP_200_OK): # yes, yes HTTP codes aren't technically correct here, but whatever
        """
        Small wrapper around self.send so we don't have to specify json.dumps and text_data each time we send.
        Intended to send to sockets/clients, not to the channel.
        :param dict data: the data to send.
        :param int status: the status code of the message. Uses HTTP statuses for simplicity. Defaults to 200 OK.
        """
        data['status'] = status
        await self.send(text_data=json.dumps(data))

    async def _send_channel_message(self, data):
        """
        Same as _send_response, but intended for the channel (hence no status).
        :param dict data: the data to send.
        """
        await self.send(text_data=json.dumps(data))

    async def _handle_round_end(self):
        winner = evaluate_round(self.match_id)
        # Send message to match group that the winner has been found out
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'winner_determined',
                'winner': winner
            }
        )

    #------------------------------------------------------------------
    # Command Processors
    #------------------------------------------------------------------
    async def _process_chat_command(self, data):
        """
        Handle incoming chat-related commands.
        """
        message = data['message']

        # Send message to match group
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def _process_rps_command(self, data):
        """
        Handle incoming rock-paper-scissors-related commands.
        """
        # because we validated, we can make assumptions like else will be the other command for rps
        if 'move' in data:
            if not await round_started(self.match_id):
                await self._send_response({
                    'error': 'rps move request cannot be made until both players have readied up, and the match has started.'
                }, status=status.HTTP_400_BAD_REQUEST)
            move = data['move']
            await set_user_move(self.match_id, self.user.id, move)
            await self._send_response(status=status.HTTP_204_NO_CONTENT)
        else: # 'ready' in data
            ready_status = data['ready']
            await set_user_ready_status(self.match_id, self.user.id, ready_status)

            # Send message to match group that user has readied up
            await self.channel_layer.group_send(
                self.match_group_id,
                {
                    'type': 'readied_up',
                    'user_readied': self.user.id
                }
            )

            # If both users are ready, first_to_ready must send the start communication
            # This way, we incentivize faster readying, as you become the 'host'
            if await both_users_ready(self.match_id):
                if await user_first_to_ready(self.user.id):
                    # Send message to match group
                    await self.channel_layer.group_send(
                        self.match_group_id,
                        {
                            'type': 'round_start',
                            'start': get_time_seconds()
                        }
                    )
                else:
                    await self.channel_layer.group_send(
                        self.match_group_id,
                        {
                            'type': 'order_start'
                        }
                    )
                    
    async def _process_bet_command(self, data):
        """
        Handle incoming rock-paper-scissors-related commands.
        """
        amount = data['amount']

        # TODO: call db func to add bet

    async def _process_channel_command(self, data):
        """
        Handle intersocket, channel-based messages.
        """
        # Send the interchannel command to our client.
        if 'start' in data:
            # need to restrict arbitrary sending of 'channel': 'start', just as we restrict 'order_start'
            if not await both_users_ready(self.match_id):
                return
            if not await round_started(self.match_id):
                return
            if self.seen_round_start:
                return
            self.seen_round_start = True
        
        await self._send_response(data)

        if 'start' in data and await user_first_to_ready(self.match_id, self.user.id):
            # Since we were the first to ready, we now officially start the timer
            wait_then_call(ROUND_TIMER, self._handle_round_end)
    
    #------------------------------------------------------------------
    # Channel Event Handlers
    #------------------------------------------------------------------
    async def chat_message(self, event):
        message = event['message']

        await self._send_channel_message({
            'command': 'chat',
            'message': message
        })

    async def round_start(self, event):
        start_time = event['start']

        await self._send_channel_message({
            'command': 'channel',
            'start': start_time
        })

    async def readied_up(self, event):
        user = event['user']

        await self._send_channel_message({
            'command': 'channel',
            'user_readied': user
        })

    async def order_start(self, event):
        if not await user_first_to_ready(self.match_id, self.user.id) :
            return
        if not await both_users_ready(self.match_id):
            return
        if await round_started(self.match_id):
            return
        if self.seen_round_start:
            return
        
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'round_start',
                'start': get_time_seconds()
            }
        )
        await set_round_as_started(self.match_id)

    async def winner_determined(self, event):
        if not self.seen_round_start:
            return
        if self.seen_round_start and await round_started(self.match_id):
            # If we've seen the round start and _handle_round_end hasn't set round_started to False, this command is BS
            return
        
        # this is a legit command, we can now set the seen_round_start to False in anticipation of seeing a new round start
        self.seen_round_start = False
        winner = event['winner']

        await self._send_channel_message({
            'command': 'channel',
            'winner': winner
        })

    #------------------------------------------------------------------
    # Data Validation
    #------------------------------------------------------------------
    async def _request_valid(self, data):
        """
        Determines if a request is formatted properly, with all appropriate arguments.
        """
        if 'command' not in data:
            await self._send_response({
                'error': 'request must include key \'command\', valued with one of {}.'.format(command_groups)
            }, status=status.HTTP_400_BAD_REQUEST)
            return False

        command_group = data['command']
        if command_group not in command_groups:
            await self._send_response({
                'error': '{} is not a valid command.'.format(command_group)
            }, status=status.HTTP_400_BAD_REQUEST)
            return False

        # order start commands have no additional info
        if command_group == 'order_start': 
            return True

        if not await self._command_valid(data, command_group):
            return False

        return True

    async def _command_valid(self, data, command_group):
        """
        Determines if the necessary arguments have been provided for a request asking for a command in command_group.
        """
        switch = {
            'rps': rps_commands,
            'chat': chat_commands,
            'bet': bet_commands,
            'channel': channel_commands
        }

        commands = switch[command_group]
        for command in commands:
            if command in data:
                if command_group == 'chat':
                    if not isinstance(data[command], basestring):
                        await self._send_response({
                            'error': 'chat request must include key \'message\' valued to a string.'
                        }, status=status.HTTP_400_BAD_REQUEST)
                        return False
                elif command_group == 'rps':
                    if command == 'ready':
                        if not isinstance(data[command], bool):
                            await self._send_response({
                            'error': 'rps ready request must include a bool value for key \'ready\'.'
                        }, status=status.HTTP_400_BAD_REQUEST)
                        return False
                    else:
                        if data[command] not in rps_move_values:
                            await self._send_response({
                            'error': 'rps move request must include one of {} as value for key \'move\'.'.format(rps_move_values)
                        }, status=status.HTTP_400_BAD_REQUEST)
                        return False
                elif command_group == 'channel':
                    if command == 'start':
                        if not isinstance(data[command], int):
                            await self._send_response({
                            'error': 'start request must include an int value for key \'start\'.'
                        }, status=status.HTTP_400_BAD_REQUEST)
                        return False
                    else: # command == 'user_readied' or command == 'winner'
                        if not isinstance(data[command], str): # TODO: string or uuid
                            await self._send_response({
                            'error': 'user_readied request must include a uuid value for key \'user_readied\'.'
                        }, status=status.HTTP_400_BAD_REQUEST)
                        return False
                else: # command_group == 'bet'
                    if not isinstance(data[command], int):
                        await self._send_response({
                        'error': 'bet amount request must include an int value for key \'amount\'.'
                    }, status=status.HTTP_400_BAD_REQUEST)
                    return False
                return True

        await self._send_response({
                'error': '{} request must include key from {}.'.format(command_group, commands)
            }, status=status.HTTP_400_BAD_REQUEST)
        return False

    #------------------------------------------------------------------
    # Command Definitions
    #------------------------------------------------------------------
    channel_commands = ['start', 'user_readied', 'winner']
    rps_commands = ['ready', 'move']
    rps_move_values = ['rock', 'paper', 'scissors']
    chat_commands = ['message']
    bet_commands = ['amount']
    command_groups = ['rps', 'chat', 'bet', 'channel', 'order_start']
    dispatch_command = {
        'rps': _process_rps_command,
        'bet': _process_bet_command,
        'chat': _process_chat_command,
        'channel': _process_channel_command,
        'begin_round': order_start
    }
    seen_round_start = False
