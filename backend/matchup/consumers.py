# matchup/consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from channels.generic.websocket import SyncConsumer
from channels.db import database_sync_to_async
from rest_framework import status

import json

from .model_interactions.handlers import \
    join_match, leave_match, round_started, set_user_move, set_user_bet, \
    set_user_ready_status, both_users_ready, evaluate_round, \
    user_first_to_ready, set_round_as_started, get_serialized_user_data, \
    proper_round_time_elapsed, match_complete, get_wallet_cash, get_total_bet, \
    get_user_skin, match_locked
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

        if self.user.is_anonymous:
            await self.accept(subprotocol='Token')
            await self._send_response(
                {
                    'error': self.scope['authentication_message']
                }, 
                status=status.HTTP_400_BAD_REQUEST)
            await self.close()
            return

        self.match_id, join_status, opponent = await join_match(self.user.id)

        if self.match_id is None:
            await self.accept(subprotocol='Token')
            await self._send_response(
                {
                    'error': '{} disallowed from joining. {}'.format(self.user.username, join_status)
                }, 
                status=status.HTTP_400_BAD_REQUEST)
            await self.close()

        self.match_group_id = 'game_%s' % self.match_id

        # Join match's channel group
        await self.channel_layer.group_add(
            self.match_group_id,
            self.channel_name
        )

        user_data = await get_serialized_user_data(self.user)
        total_bet = await get_total_bet(self.match_id)
        skin = await get_user_skin(self.user.id)
        
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'user_joined',
                'user': user_data,
                'bet': total_bet,
                'active_skin': skin,
            }
        )

        if opponent is not None:
            print("{} requesting info!".format(self.user.username))
            await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'request_info',
                'user_id': str(opponent)
            }
        )

        await self.accept(subprotocol='Token')

    async def disconnect(self, close_code):
        """
        Ensures proper cleanup upon leaving.
        """
        if self.user.is_anonymous:
            # Do nothing if we early-aborted for an unauth'd user
            return
        # Leave match's channel group
        user_data = await get_serialized_user_data(self.user)
        left_match_exists = await leave_match(self.match_id, self.user.id)
        locked = True
        if left_match_exists:
            locked = await match_locked(self.match_id)
        self.user_vacated = True
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'user_left',
                'user': user_data,
                'lock': locked
            }
        )
        await self.channel_layer.group_discard(
            self.match_group_id,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Parses incoming requests along the Websocket, and passes to the appropriate command handler.
        """
        data = json.loads(text_data)
        if not await self._request_valid(data):
            return

        command = data['command']
        print('validated {}'.format(command))
        await self.dispatch_command[command](self, data)

    #------------------------------------------------------------------
    # Utilities
    #------------------------------------------------------------------
    async def _send_response(self, data = {}, status=status.HTTP_200_OK, id = None): # yes, yes HTTP codes aren't technically correct here, but whatever
        """
        Small wrapper around self.send so we don't have to specify json.dumps and text_data each time we send.
        Intended to send to sockets/clients, not to the channel.
        :param dict data: the data to send.
        :param int status: the status code of the message. Uses HTTP statuses for simplicity. Defaults to 200 OK.
        :param int id: the request id, as per websocket as promised. Excluded if not specified.
        """
        data['status'] = status
        if id is not None: data['id'] = id
        await self.send(text_data=json.dumps(data))

    async def _send_channel_message(self, data):
        """
        Same as _send_response, but it is a message which originated from the channel (hence no status, nor request ID).
        This way, on the user's end, they know this not in response to some request they made.
        :param dict data: the data to send.
        """
        await self.send(text_data=json.dumps(data))

    #------------------------------------------------------------------
    # Command Processors
    #------------------------------------------------------------------
    async def _process_chat_command(self, data):
        """
        Handle incoming chat-related commands.
        """
        message = data['message']
        user = self.user.username

        # Send message to match group
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'chat_message',
                'message': message,
                'user': user
            }
        )
        await self._send_response(status=status.HTTP_204_NO_CONTENT, id=data['id'])

    async def _process_rps_command(self, data):
        """
        Handle incoming rock-paper-scissors-related commands.
        """
        # because we validated, we can make assumptions like else will be the other command for rps
        if 'move' in data:
            print('move in data')
            if not await round_started(self.match_id):
                await self._send_response({
                    'error': 'rps move request cannot be made until both players have readied up, and the match has started.'
                }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
            move = data['move']
            await set_user_move(self.match_id, self.user.id, move)
            await self._send_response(status=status.HTTP_204_NO_CONTENT, id=data['id'])
        else: # 'ready' in data
            print('in ready state')
            ready_status = data['ready']
            await set_user_ready_status(self.match_id, self.user.id, ready_status)

            # Send message to match group that user has readied up
            await self.channel_layer.group_send(
                self.match_group_id,
                {
                    'type': 'readied_up',
                    'user_readied': self.user.username
                }
            )

            # If both users are ready, first_to_ready must send the start communication
            # This way, we incentivize faster readying, as you become the 'host'
            if await both_users_ready(self.match_id):
                if await user_first_to_ready(self.match_id, self.user.id):
                    print("bothj users ready, {} is the first!".format(self.user.username))
                    # Send message to match group
                    await self.channel_layer.group_send(
                        self.match_group_id,
                        {
                            'type': 'round_start',
                            'start': get_time_seconds()
                        }
                    )
                else:
                    print("both users ready, {} is not the first!".format(self.user.username))
                    await self.channel_layer.group_send(
                        self.match_group_id,
                        {
                            'type': 'order_start'
                        }
                    )
                    
    #EXPERIMENTAL
    async def _process_bet_command(self, data):
        """
        Handle incoming betting-related commands.
        """
        amount = data['amount']
        user = self.user.id

        # determine whether this amount can be safely bet.
        my_cash, bet_cash = await get_wallet_cash(self.match_id, user)
        if (my_cash - bet_cash) - amount < 0:
            await self._send_response({
                    'command': 'bet',
                    'error': 'Not enough money to bet.',
                    'user': str(user)
                }, status=status.HTTP_409_CONFLICT, id=data['id'])
            return
        else:
            await set_user_bet(self.match_id, user, amount)

        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'bet_made',
                'user': str(user),
                'amount': amount
            }
        )

    async def _process_order_start_command(self, data):
        """
        Handle user-generated (not channel-generated) order start commands.
        """
        allowed_order_start, allowance_reason = await self._order_start_allowed()
        if not allowed_order_start:
            return

        await self._start_a_round()

    async def _process_round_end_command(self, data):
        if self.user_vacated:
            return
        if not self.seen_round_start:
            return
        if not await round_started(self.match_id):
            return
        if not await proper_round_time_elapsed(self.match_id, ROUND_TIMER):
            return
        winner, user1_id, user2_id, user1_move, user2_move = await evaluate_round(self.match_id, self.user.id)
        if await match_complete(self.match_id):
            await self.channel_layer.group_send(
                self.match_group_id,
                {
                    'type': 'winner_determined',
                    'winner': str(winner),
                    'user1': str(user1_id),
                    'user2': str(user2_id),
                    'user1_move': user1_move,
                    'user2_move': user2_move,
                    'match_over': True
                }
            )
        else:
            # Send message to match group that the winner has been found out
            await self.channel_layer.group_send(
                self.match_group_id,
                {
                    'type': 'winner_determined',
                    'winner': str(winner),
                    'user1': str(user1_id),
                    'user2': str(user2_id),
                    'user1_move': user1_move,
                    'user2_move': user2_move,
                    'match_over': False
                }
            )
        

    # EXPERIMENTAL
    '''async def _stop_the_game(self):
        """
        we have reached here because the other user never readied up.
        if there was supposed to be another user, but they haven't been
        doing anything for the past 2 minutes, leave the match.
        """
        if not await both_users_ready(self.match_id):
            # disconnect somehow
            await leave_match(self.match_id, self.user.id)
            await self.channel_layer.group_discard(
                self.match_group_id,
                self.channel_name
            )'''

    #------------------------------------------------------------------
    # Channel Event Handlers
    # ALL of these can ONLY be called by a call to group_send(), and so must have come from an internal source.
    #------------------------------------------------------------------
    async def user_joined(self, event):
        """
        Alert consumers/users that someone has a joined.
        """
        user = event['user']

        await self._send_channel_message({
            'command': 'channel',
            'user_joined': user,
            'total_bet': event['bet'],
            'active_skin': event['active_skin']
        })
    
    async def user_left(self, event):
        """
        Alert consumers/users that someone has a joined.
        """
        user = event['user']
        lock = event['lock']

        if lock:
            self.user_vacated = True

        await self._send_channel_message({
            'command': 'channel',
            'user_left': user,
            'lock': lock,
        })


    async def chat_message(self, event):
        """
        Send a received chat message to all users.
        """
        message = event['message']
        user = event['user']

        await self._send_channel_message({
            'user': user,
            'command': 'chat',
            'message': message
        })

    async def round_start(self, event):
        """
        Alert all users that a round has started.
        """
        start_time = event['start']
        print("{} sending channel start_time message!".format(self.user.username))
        await self._send_channel_message({
            'command': 'channel',
            'start': start_time
        })

    async def readied_up(self, event):
        """
        Alert all users that someone has readied up.
        """
        user = event['user_readied']

        await self._send_channel_message({
            'command': 'channel',
            'user_readied': user
        })

    async def order_start(self, event):
        """
        Handle a channel-generated (not user-generated) order start command.
        As of now, this is called if the user who was first to ready up readies up, and both users are ready at that time.
        """
        allowed_order_start, _ = await self._order_start_allowed()
        if not allowed_order_start:
            return
        print("{} is starting the round!".format(self.user.username))
        await self._start_a_round()


    async def winner_determined(self, event):
        winner = event['winner']
        match_over = event['match_over']

        await self._send_channel_message({
            'command': 'channel',
            'winner': winner,
            'user1': event['user1'],
            'user2': event['user2'],
            'user1_move': event['user1_move'],
            'user2_move': event['user2_move'],
            'match_over': match_over
        })

        self.seen_round_start = False

    async def request_info(self, event):
        user_id = event['user_id']
        print("{} got info send request!".format(self.user.username))
        
        if str(self.user.id) != user_id:
            return

        print("{} sending info!".format(self.user.username))
        user_data = await get_serialized_user_data(self.user)
        skin = await get_user_skin(self.user.id)

        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'declare_info',
                'user': user_data,
                'active_skin': skin
            })

    async def declare_info(self, event):
        user_data = event['user']

        if str(user_data['id']) == self.user.id:
            return

        print("{} got info!".format(self.user.username))

        await self._send_channel_message({
            'command': 'channel',
            'user_joined': user_data,
            'active_skin': event['active_skin']
        })

    #EXPERIMENTAL
    async def bet_made(self, event):
        user = event['user']
        amount = event['amount']

        await self._send_channel_message({
            'command': 'bet',
            'user_betting': user,
            'bet_amount': amount
        })

    #------------------------------------------------------------------
    # Data Validation
    #------------------------------------------------------------------
    async def _request_valid(self, data):
        """
        Determines if a request is formatted properly, with all appropriate arguments.
        """
        if 'id' not in data:
            await self._send_response({
                'error': 'all requests must include an \'id\' key, valued with a unique integer.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if 'command' not in data:
            await self._send_response({
                'error': 'request must include key \'command\', valued with one of {}.'.format(self.command_groups)
            }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
            return False

        command_group = data['command']
        if command_group not in self.command_groups:
            await self._send_response({
                'error': '{} is not a valid command.'.format(command_group)
            }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
            return False

        # order start/begin_round & end_round commands have no additional info, and their allowance is determined within the function itself
        if command_group == 'begin_round' or 'end_round': 
            return True

        if not await self._command_valid(data, command_group):
            return False

        return True

    async def _command_valid(self, data, command_group):
        """
        Determines if the necessary arguments have been provided for a request asking for a command in command_group.
        """
        switch = {
            'rps': self.rps_commands,
            'chat': self.chat_commands,
            'bet': self.bet_commands,
        }

        commands = switch[command_group]
        for command in commands:
            if command in data:
                if command_group == 'chat':
                    if not isinstance(data[command], str):
                        await self._send_response({
                            'error': 'chat request must include key \'message\' valued to a string.'
                        }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
                        return False
                elif command_group == 'rps':
                    if command == 'ready':
                        if not isinstance(data[command], bool):
                            print("no bool")
                            await self._send_response({
                            'error': 'rps ready request must include a bool value for key \'ready\'.'
                        }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
                            return False
                    else:
                        if data[command] not in self.rps_move_values:
                            await self._send_response({
                            'error': 'rps move request must include one of {} as value for key \'move\'.'.format(rps_move_values)
                        }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
                        return False
                else: # command_group == 'bet'
                    if not isinstance(data[command], int):
                        await self._send_response({
                        'error': 'bet amount request must include an int value for key \'amount\'.'
                    }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
                    return False
                return True

        await self._send_response({
                'error': '{} request must include key from {}.'.format(command_group, commands)
            }, status=status.HTTP_400_BAD_REQUEST, id=data['id'])
        return False

    async def _order_start_allowed(self):
        """
        Determines if an order_start command is allowed to be called).

        :rtype: bool, str
        :return:
            True if it is allowed, False otherwise.
            Reason why it is disallowed/allowed.
        """
        if not await user_first_to_ready(self.match_id, self.user.id) :
            return False, '{} is not the first user to ready up, and cannot order round starts.'.format(self.user.id)
        if not await both_users_ready(self.match_id):
            return False, 'Both users are not ready. A round start cannot be ordered.'
        if await round_started(self.match_id) or self.seen_round_start:
            return False, 'The round has already started. A round start cannot be ordered in the middle of a round.'
        return True, '{} is allowed to order a start.'.format(self.user.id)

    async def _start_a_round(self):
        """
        Starts a round of RPS!
        """
        self.seen_round_start = True # used to prevent the next round from starting until we're sure winner info has been dispatched
        
        await self.channel_layer.group_send(
            self.match_group_id,
            {
                'type': 'round_start',
                'start': get_time_seconds()
            }
        )
        await set_round_as_started(self.match_id)

    #------------------------------------------------------------------
    # Command Definitions
    #------------------------------------------------------------------
    # these are specified for doc's sake -- no user can call these, only .send_group() messages can
    channel_commands = ['start', 'user_readied', 'winner', 'user_joined', 'request_info', 'declare_info']
    # these are commands which can be called by the user, hence available in dispatch_command
    rps_commands = ['ready', 'move']
    rps_move_values = ['rock', 'paper', 'scissors']
    chat_commands = ['message']
    bet_commands = ['amount']
    command_groups = ['rps', 'chat', 'bet', 'begin_round', 'end_round']
    dispatch_command = {
        'rps': _process_rps_command,
        'bet': _process_bet_command,
        'chat': _process_chat_command,
        'begin_round': _process_order_start_command,
        'end_round': _process_round_end_command
    }
    seen_round_start = False
    user_vacated = False
