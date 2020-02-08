from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

import uuid

from .managers import RoshamboUserManager

class RoshamboUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True) # changes email to unique and blank to false
    country_code = models.PositiveSmallIntegerField(default=0)

    # remove unnecessary fields from AbstractUser
    is_superuser = None

    objects = RoshamboUserManager()

    def __str__(self):
        return 'email: {}; username: {}'.format(self.email, self.username)
