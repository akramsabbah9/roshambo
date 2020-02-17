# matchup/consumers.py

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.generic.websocket import SyncConsumer
from channels.db import database_sync_to_async

import json

from .models import Room
from .utils import get_room_name, leave_room

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
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
        # Leave room group
        await leave_room(self.room_name)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        # TODO
        # Add differentiate between hands/messages
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    # Receive rps-message from room group
    # TODO
    async def game_message(self, event):
        #need to rewrite templates
        message = event['hand']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'hand': message
        }))

#TODO keep track of state here?
#TODO how to start only once?
class GameConsumer(SyncConsumer):
    def connect(self, event):
        self.room_name = name #TODO
        self.room_group_name = 'game_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, event):
        text_data_json = json.loads(text_data)
        message = text_data_json['hand']
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': 'Player sent '.join(message)
            }