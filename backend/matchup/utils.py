from channels.db import database_sync_to_async
from .models import Room
from .exceptions import ExistError
import random
import string

@database_sync_to_async
def get_room_name():
    # find a room
    rooms = list(Room.objects.filter(usr_count__lte=1))
    if len(rooms) == 0:
        # if no rooms are open, make a new one
        name = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
        #while Room.objects.get(title=name):
        #    name = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
        room = Room.objects.create(title=name)
    else:
        room = rooms[0]
        name = rooms[0].title
    # increment usr_count of that room, and get out
    room.usr_count += 1
    room.save()
    return name


@database_sync_to_async
def leave_room(name):
    try:
        room = Room.objects.get(title=name)
    except Room.DoesNotExist:
        raise ExistError("ROOM DOES NOT EXIST!")
    
    room.usr_count -= 1
    room.save()
    if (room.usr_count <= 0):
        room.delete()
