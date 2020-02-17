# matchup/consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
from channels.generic.websocket import SyncConsumer
from channels.db import database_sync_to_async

import json

from .models import Room
from .utils import get_room_name, leave_room


class MatchmakingConsumer(AsyncWebsocketConsumer):
    #------------------------------------------------------------------
    # Web Socket Communicators
    #------------------------------------------------------------------
    async def connect(self):
        """
        Called when first connecting to the socket. Finds a player an appropriate room to join.
        """
        # find a room
        name = await get_room_name()

        self.room_name = name
        self.room_group_name = 'game_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Ensures proper cleanup upon leaving.
        """
        # Leave room group
        await leave_room(self.room_name)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, received_data):
        """
        Parses incoming requests along the Websocket, and passes to the appropriate command handler.
        """
        data = json.loads(received_data)
        if not await self._request_valid(data):
            return

        await self.dispatch_command[command](self, data)

    #------------------------------------------------------------------
    # Utilities
    #------------------------------------------------------------------
    async def _send_message(self, data):
        await self.send(text_data=json.dumps(data))

    #------------------------------------------------------------------
    # Command Processors
    #------------------------------------------------------------------
    async def _process_chat_command(self, data):
        """
        Handle incoming chat-related commands.
        """
        message = data['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def _process_rps_command(self, data):
        """
        Handle incoming rock-paper-scissors-related commands.
        """
        # because we validated, we can make assumptions like this
        if 'move' in data:
            # TODO: call db func to check if we've even readied up, reject if not
            move = data['move']
            # TODO: call db func to set the move for the user
        else:
            ready_status = data['ready']
            # TODO: call db func to set the ready status for the user
            # Also need to check if both users are ready... if so, start the game timer

    async def _process_bet_command(self, data):
        """
        Handle incoming rock-paper-scissors-related commands.
        """
        amount = data['amount']

        # TODO: call db func to add bet
    
    #------------------------------------------------------------------
    # Channel Event Handlers
    #------------------------------------------------------------------
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    #------------------------------------------------------------------
    # Data Validation
    #------------------------------------------------------------------
    async def _request_valid(self, data):
        """
        Determines if a request is formatted properly, with all appropriate arguments.
        """
        if 'command' not in data:
            await self._send_message({
                'error': 'request must include key \'command\', valued with one of {}.'.format(command_groups)
            })
            return False

        command_group = data['command']
        if command_group not in command_groups:
            await self._send_message({
                'error': '{} is not a valid command.'.format(command)
            })
            return False

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
            'bet': bet_commands
        }

        commands = switch[command_group]
        for command in commands:
            if command in data:
                if command_group == 'chat':
                    if not isinstance(data[command], basestring):
                        await self._send_message({
                            'error': 'chat request must include key \'message\' valued to a string.'
                        })
                        return False
                elif command_group == 'rps':
                    if command == 'ready':
                        if not isinstance(data[command], bool):
                            await self._send_message({
                            'error': 'rps ready request must include a bool value for key \'ready\'.'
                        })
                        return False
                    else:
                        if data[command] not in rps_move_values:
                            await self._send_message({
                            'error': 'rps move request must include one of {} as value for key \'move\'.'.format(rps_move_values)
                        })
                        return False
                else: # command_group == 'bet'
                    if not isinstance(data[command], int):
                        await self._send_message({
                        'error': 'bet amount request must include an int value for key \'amount\'.'
                    })
                    return False
                return True

        await self._send_message({
                'error': '{} request must include key from {}.'.format(command_group, commands)
            })
        return False

    #------------------------------------------------------------------
    # Command Definitions
    #------------------------------------------------------------------
    rps_commands = ['ready', 'move']
    rps_move_values = ['rock', 'paper', 'scissors']
    chat_commands = ['message']
    bet_commands = ['amount']
    command_groups = ['rps', 'chat', 'bet']
    dispatch_command = {
        'rps': _process_rps_command,
        'bet': _process_bet_command,
        'chat': _process_chat_command
    }
