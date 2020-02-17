# accounts/views/stats.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin
from rest_framework.serializers import ValidationError

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

    def put(self, request, format='json'):
        self._validate_put_request(request)
        # TODO(benjibrandt): need to verify transaction has occurred
        amount = request.data['amount']
        action = request.data['action']
        current_cash = request.user.wallet.cash
        if action == 'sub' and amount > current_cash:
            return Response(
                {'amount': '{} is greater than user\'s current balance. Cannot complete transaction.'.format(amount)}, 
                status=status.HTTP_402_PAYMENT_REQUIRED
            )

        request.user.wallet.cash = current_cash + amount if action == 'add' else current_cash - amount
        request.user.wallet.save()

        updated_wallet = WalletSerializer(request.user.wallet)

        return Response(updated_wallet.data, status=status.HTTP_200_OK)

    def _validate_put_request(self, request):
        if not request.data:
            raise ValidationError({'error': 'request is empty'}, code='invalid')

        if 'amount' not in request.data or 'action' not in request.data:
            raise ValidationError({'error': 'request must specify amount and action (add, sub).'})

        wallet_fields = [field.name for field in Wallet._meta.get_fields()]
        check_for_edit_validation_errors(set(['amount', 'action']), set(['amount', 'action']), set(request.data.keys()))

