from django.db import models

class Room(models.Model):

    # Room name
    title = models.CharField(max_length=255)

    # Number of people in room
    usr_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        return "room-%s" % self.id