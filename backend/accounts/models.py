from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

import uuid

from .managers import RoshamboUserManager

class RoshamboUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True) # changes email to unique and blank to false
    country_code = models.PositiveSmallIntegerField(default=0)
    guild = models.CharField(max_length=30, default='')

    # remove unnecessary fields from AbstractUser
    is_superuser = None

    objects = RoshamboUserManager()

    def __str__(self):
        return 'email: {}; username: {}'.format(self.email, self.username)


class Stats(models.Model):
    user = models.OneToOneField(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    games_won = models.PositiveIntegerField(default=0)
    games_lost = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'user: {}; games won: {}; games lost: {}'.format(self.user, self.games_won, self.games_lost)


class SkinsInventory(models.Model):
    skin = models.PositiveIntegerField(primary_key=True)


class Skins(models.Model):
    user = models.OneToOneField(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    active_skin = models.ForeignKey(SkinsInventory, on_delete=models.CASCADE, related_name='value')
    purchased_skins = models.ManyToManyField(SkinsInventory)
