# roshambo/utils.py

from accounts.serializers import UserSerializer


def user_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
