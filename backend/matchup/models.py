# matchup/models.py

from django.db import models
from channels.consumer import SyncConsumer

import uuid

class Match(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # Number of people in room
    user_count = models.IntegerField(default=0)

    # Has the room been filled, locking it from further entry even if user_count drops?
    lock = models.BooleanField(default=False)

    # IDs of the users that have joined
    user1 = models.UUIDField(null=True, blank=True)
    user2 = models.UUIDField(null=True, blank=True)

    # Users choices for that particular round (rock, paper or scissors)
    user1_choice = models.PositiveSmallIntegerField(null=True, blank=True)
    user2_choice = models.PositiveSmallIntegerField(null=True, blank=True)

    # Whether or not they're ready
    user1_ready = models.BooleanField(default=False)
    user2_ready = models.BooleanField(default=False)
    first_to_ready = models.UUIDField(null=True, blank=True)

    # What they're betting
    user1_bet = models.PositiveIntegerField(default=0)
    user2_bet = models.PositiveIntegerField(default=0)

    # How many wins do they each have
    user1_wins = models.PositiveSmallIntegerField(default=0)
    user2_wins = models.PositiveSmallIntegerField(default=0)

    # Have we even started playing
    started = models.BooleanField(default=False)

    # How many rounds we've done
    rounds_finished = models.PositiveSmallIntegerField(default=0)
    round_start_ts = models.PositiveIntegerField(default=2147483647)

    # Timestamps for when the users last sent a message
    user1_ts = models.PositiveIntegerField(default=0)
    user2_ts = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'match {} with {} users'.format(id, user_count)

    @property
    def group_name(self):
        return "match-%s" % self.id
