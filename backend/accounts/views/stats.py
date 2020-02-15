# accounts/views/stats.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin

from ..models import Stats
from ..serializers import StatsSerializer


class Stats(GenericAPIView, UpdateModelMixin):
    """
    
    """
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer

    def get(self, request, format='json'):
        stats = StatsSerializer(request.user.stats)
        return Response(stats.data)

    def get_object(self):
        return self.request.user.stats

    def put(self, request, format='json'):
        # TODO: make sure this is only allowed post-winning/losing a game
        return self.partial_update(request)
