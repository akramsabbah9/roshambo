# accounts/views/stats.py

import stripe

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.serializers import ValidationError

from django.conf import settings

from ..models import Wallet
from ..serializers import WalletSerializer
from ..utils import check_for_edit_validation_errors

class WalletAPI(GenericAPIView, UpdateModelMixin):
    """
    @auth-required: yes
    @method-supported: GET, PUT
    @GET: 
        @return: 
            keys: amount, action
            values: 
                amount == amount to add/sub
                action MUST be one of [add, sub]. If add, amount will be added. If sub, amount will be subtracted.
    @PUT: 
        @param stat-type:
            key: games_(won|lost)
            value: positive integer to set the respective field to.
        @return: the newly-updated games_won and games_lost, akin to GET.
    """

    def get(self, request, format='json'):
        wallet = WalletSerializer(request.user.wallet)
        return Response(wallet.data)

    def put(self, request, format='json', **kwargs):
        self._validate_put_request(request)

        amountToAdd = request.data['amount']

        stripe.api_key = getattr(settings, "STRIPE_API_KEY", None)
        if stripe.api_key is None:
            raise NotImplementedError({'error': 'Stripe API key has not been set!'})

        charge = stripe.Charge.create(
            amount=amountToAdd,
            currency='usd',
            description='A Django charge',
            source=request.data['stripe_token']
        )
        if charge.outcome.network_status == 'approved_by_network' and charge.outcome.type == "authorized":
            current_cash = request.user.wallet.cash
            request.user.wallet.cash = current_cash + amountToAdd 
            request.user.wallet.save()

            updated_wallet = WalletSerializer(request.user.wallet)

            return Response(updated_wallet.data, status=status.HTTP_200_OK)
        else: 
            # seller_message is a human-readable reason for the denial... not intended for customers, as per the docs, but oh well
            raise Response({'error': charge.outcome.seller_message}, status=status.HTTP_402_PAYMENT_REQUIRED)

    def _validate_put_request(self, request):
        if not request.data:
            raise ValidationError({'error': 'request is empty'}, code='invalid')

        if 'amount' not in request.data:
           raise ValidationError({'error': 'request must specify amount.'})
        
        if 'stripe_token' not in request.data:
           raise ValidationError({'error': 'request must specify a valid Stripe token.'})

    def get_context_data(self, **kwargs): 
        context = super().get_context_data(**kwargs)
        context['key'] = settings.STRIPE_PUBLISHABLE_KEY
        return context