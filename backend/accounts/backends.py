# accounts/backends.py

from django.contrib.auth.backends import ModelBackend

from .models import RoshamboUser as User

class RoshamboUserBackend(ModelBackend):

    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None