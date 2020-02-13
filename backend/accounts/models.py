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
    active_skin = models.PositiveIntegerField(default=0)

    # remove unnecessary fields from AbstractUser
    is_superuser = None

    objects = RoshamboUserManager()

    def __str__(self):
        return 'email: {}; username: {}'.format(self.email, self.username)


class UserStats(models.Model):
    user = models.ForeignKey(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    games_played = models.PositiveIntegerField(default=0)
    games_won = models.PositiveIntegerField(default=0)
    games_lost = models.PositiveIntegerField(default=0)

    def __str__(self):
        return ''


class AvailableSkins(models.Model):
    skin = models.PositiveIntegerField(primary_key=True)


class PurchasedSkins(models.Model):
    user = models.ForeignKey(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    skin = models.ForeignKey(AvailableSkins, on_delete=models.CASCADE)
