from channels.db import database_sync_to_async
from .models import Room
import random
import string

@database_sync_to_async
def get_room_name():
    # find a room
    rooms = list(Room.objects.filter(usr_count__lte=1))
    if len(rooms) == 0:
        name = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
        new_room = Room.objects.create(title=name)
    else:
        name = rooms[0].title
    return name