from django.db import models

class Room(models.Model):

    # Room name
    title = models.CharField(max_length=255)

    # Number of people in room
    usr_count = models.IntegerField(default=0)

    # Has the room been filled, locking it from further entry even if usr_count drops?
    lock = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        return "room-%s" % self.id