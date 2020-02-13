# accounts/view.py

from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from rest_framework.mixins import UpdateModelMixin

from .models import RoshamboUser as User
from .serializers import UserSerializer, EditUserSerializer


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def users(request):
    """
    Gets a list of all users' usernames
    """
    usernames = User.objects.values_list('username', flat=True)
    return Response({'users': usernames})


@api_view(['GET'])
def active_users(request):
    """
    Gets a list of all active users' usernmes
    """
    usernames = User.objects.filter(is_active=True).values_list('username', flat=True)
    return Response({'users': usernames})


class EditUser(GenericAPIView, UpdateModelMixin):
    """
    Edits a valid field for a user.
    """
    queryset = User.objects.all()
    serializer_class = EditUserSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        # make sure to catch 404's below
        obj = queryset.get(pk=self.request.user.id)
        self.check_object_permissions(self.request, obj)
        return obj

    def put(self, request, format='json'):
        return self.partial_update(request)
        

class Register(APIView):
    """ 
    Creates a given user.
    """
    # This permission class will overide the global permission class setting
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            update_last_login(request, user)
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    """
    Logs in a user.
    """
    # This permission class will overide the global permission class setting
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        email = request.data.get("email")
        password = request.data.get("password")
        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'},
                        status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(email=email, password=password)
        if user is not None:
            token = self.login(request, user, email)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)

    def login(self, request, user, email):
        user_state = User.objects.get(email=email)
        user_state.is_active = True
        user_state.save()
        update_last_login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return token

class Logout(APIView):

    def post(self, request, format=None):  
        # simply delete the token to force a login  
        request.user.is_active = False
        request.user.auth_token.delete()  
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
