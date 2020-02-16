# accounts/views/users.py

from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.db.models import F
from django.http import JsonResponse
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.authtoken.models import Token
from rest_framework.mixins import UpdateModelMixin

from ..models import RoshamboUser as User, SkinsInventory, Skins, Stats
from ..serializers import UserSerializer, EditUserSerializer


@api_view(['GET'])
def current_user(request):
    """
    @auth-required: yes
    @method-supported: GET
    @GET: 
        @return: 
            keys:
                country_code
                email
                guild
                username
                id
            value: appropriate values corresponding to the keys.
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
def users(request):
    """
    @auth-required: yes
    @method-supported: GET
    @GET: 
        @return: top 10 list of user infos.
            keys: games_won, games_lost, guild, username, is_active
            value: valid value to set the corresponding field to.
    """
    users_info = list(User.objects.annotate(
        games_won=F('stats__games_won'), games_lost=F('stats__games_lost')
    ).values('username', 'guild', 'games_won', 'games_lost', 'is_active'))[:10]
    return JsonResponse(users_info, safe=False)


@api_view(['GET'])
def active_users(request):
    """
    @auth-required: yes
    @method-supported: GET
    @GET: 
        @return: top 10 list of active user infos.
            keys: games_won, games_lost, guild, username
            value: valid value to set the corresponding field to.
    """
    active_users = list(User.objects.filter(is_active=True).annotate(
        games_won=F('stats__games_won'), games_lost=F('stats__games_lost')
    ).values('username', 'guild', 'games_won', 'games_lost'))[:10]
    return Response(active_users)


class EditUser(GenericAPIView, UpdateModelMixin):
    """
    @auth-required: yes
    @method-supported: PUT
    @PUT: 
        @param user-field:
            key: username|email|password|country_code|guild
            value: valid value to set the corresponding field to.
        @return: the newly-updated user representation, as per GET /accounts/users/current/.
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
    @auth-required: no
    @method-supported: POST
    @POST: 
        @param user-field:
            keys: username, email, password, first_name, last_name, [country_code]
            value: valid value to set the corresponding field to.
        @return: 
            Token: the valid token for the user session
            the newly-created user representation, as per GET /accounts/users/current/.
    """
    # This permission class will overide the global permission class setting
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                self._add_default_skin(user)
                self._initialize_stats_entries(user)
                update_last_login(request, user)
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'User creation failed due to an internal server error. Try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _add_default_skin(self, user):
        skin = SkinsInventory.objects.get(skin=0)
        user_skin = Skins(user=user, active_skin=skin)
        user_skin.save() # must be saved before we can add to purchased_skins
        user_skin.purchased_skins.add(skin)
        user_skin.save()

    def _initialize_stats_entries(self, user):
        user_stats = Stats(user=user)
        user_stats.save()


class Login(APIView):
    """
    @auth-required: no
    @method-supported: POST
    @POST: 
        @param user-field:
            keys: email, password
            value: valid value to set the corresponding field to.
        @return: 
            Token: the valid token for the user session
            the user representation, as per GET /accounts/users/current/.
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
            token = self._login(request, user, email)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_404_NOT_FOUND)

    def _login(self, request, user, email):
        user_state = User.objects.get(email=email)
        user_state.is_active = True
        user_state.save()
        update_last_login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return token

@api_view(['POST'])
def logout(request, format=None):  
    """
    @auth-required: yes
    @method-supported: POST
    @POST: 
        @return: HTTP 204 no content. Logout performed successfully.
    """
    # simply delete the token to force a login  
    request.user.is_active = False
    request.user.auth_token.delete()  
    request.user.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


