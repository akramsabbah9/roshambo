from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class RoshamboUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, username, email, password, first_name, last_name, country_code=0, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            email=email, 
            username=username, 
            is_active=True, 
            country_code=country_code, 
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user
