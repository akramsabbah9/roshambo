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
        return 'id: {}; email: {}; username: {}'.format(self.id, self.email, self.username)


class Wallet(models.Model):
    """
    Will house in-site currency. Will only allow for whole numbers, so will use an integer.
    Store purchases buy increments of this currency, and this currency is used for all other purchases.
    """
    user = models.OneToOneField(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    cash = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'user {} has {} in in-site currency.'.format(self.user, self.cash)


class Stats(models.Model):
    user = models.OneToOneField(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    games_won = models.PositiveIntegerField(default=0)
    games_lost = models.PositiveIntegerField(default=0)

    def __str__(self):
        return 'user: {}; games won: {}; games lost: {}'.format(self.user, self.games_won, self.games_lost)


class SkinsInventory(models.Model):
    skin = models.PositiveIntegerField(primary_key=True)
    price = models.PositiveIntegerField(default=5)

    def __str__(self):
        return 'skin {} costs {} in in-site currency.'.format(self.skin, self.price)


class Skins(models.Model):
    user = models.OneToOneField(RoshamboUser, on_delete=models.CASCADE, primary_key=True)
    active_skin = models.ForeignKey(SkinsInventory, on_delete=models.CASCADE, related_name='value')
    purchased_skins = models.ManyToManyField(SkinsInventory)

    def __str__(self):
        return 'user {} has skin {} currently active, and owns {}.'.format(self.user, self.active_skin, self.purchased_skins)
