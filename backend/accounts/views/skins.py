# accounts/views/skins.py

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError


from ..models import SkinsInventory, Skins, RoshamboUser as User
from ..serializers import SkinsSerializer, SkinsInventorySerializer
from ..utils import check_for_edit_validation_errors, flatten_skin_data

import json
from django.http import HttpResponse

@api_view(['GET'])
def available_skins(request):
    """
    @auth-required: yes
    @method-supported: GET
    @return: 
        key: skins
        value: a list of positive integers, corresponding to all possible skins that are available.
    """
    skins = SkinsInventory.objects.values_list('skin', flat=True)
    return Response({'skins': skins})


class ActiveUserSkin(APIView):
    """
    @auth-required: yes
    @method-supported: GET, PUT
    @GET: 
        @return: 
            key: active_skin
            value: the positive integer representing the currently-active user skin.
    @PUT: 
        @param skin: 
            key: active_skin
            value: the new skin to apply. Must be available according to GET /accounts/skins/purchased/
        @return: the now-updated active_skin, akin to GET.
    """
    def get(self, request, format='json'):
        skin_data = SkinsSerializer(request.user.skins).data
        skin = skin_data['active_skin']['skin']
        return Response({'active_skin': skin}, status=status.HTTP_200_OK)

    def put(self, request, format='json'):
        self._validate_put_request(request)

        desired_active_skin = request.data['active_skin']
        active_skin = request.user.skins.purchased_skins.filter(skin=desired_active_skin)
        if not active_skin:
            return Response(
                {'active_skin': '{} has not been purchased and thus cannot be set as the active skin.'.format(desired_active_skin)}, 
                status=status.HTTP_402_PAYMENT_REQUIRED
            )

        request.user.skins.active_skin = active_skin.first()
        request.user.skins.save()

        response_data = SkinsSerializer(request.user.skins).data

        return Response({'active_skin': response_data['active_skin']['skin']}, status=status.HTTP_200_OK)

    def _validate_put_request(self, request):
        if not request.data:
            raise ValidationError({'error': 'request is empty'}, code='invalid')

        skin_fields = [field.name for field in Skins._meta.get_fields()]
        check_for_edit_validation_errors(set(skin_fields), set(['active_skin']), set(request.data.keys()))


class PurchasedUserSkins(APIView):
    """
    @auth-required: yes
    @method-supported: GET, PUT
    @GET: 
        @return: 
            key: purchased_skins
            value: list of positive integers representing purchased skins.
    @PUT: 
        @param skin: 
            key: purchased_skins
            value: list of positive integers representing purchased skins to add. Must be available according to GET /accounts/skins/.
        @return: the now-updated purchased_skins, akin to GET.
    """
    def get(self, request, format='json'):
        data = self._generate_response_data(request)
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request, format='json'):
        self._validate_put_request(request)

        # TODO(benjibrandt): need to check based on Stripe token
        newly_purchased_skins = request.data['purchased_skins']
        for skin in newly_purchased_skins:
            skin_object = SkinsInventory.objects.filter(skin=skin)
            if skin_object:
                request.user.skins.purchased_skins.add(skin_object)
                request.user.skins.save()
            else:
                return Response({'error': '{} is not a valid skin.'.format(skin)}, status=status.HTTP_404_NOT_FOUND)

        data = self._generate_response_data(request)
        return Response(data, status=status.HTTP_200_OK)

    def _validate_put_request(self, request):
        
        if not request.data:
            raise ValidationError({'error': 'request is empty'}, code='invalid')

        skin_fields = [field.name for field in Skins._meta.get_fields()]
        check_for_edit_validation_errors(set(skin_fields), set(['purchased_skins']), set(request.data.keys()))

        if not isinstance(request.data['purchased_skins'], list):
            return Response(
                {'purchased_skins': 'purchased_skins be formatted as a list.'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def _generate_response_data(self, request):
        skin_data = SkinsSerializer(request.user.skins).data
        flatten_skin_data(skin_data)
        return {'purchased_skins': skin_data['purchased_skins']}
