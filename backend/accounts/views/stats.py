# accounts/views/stats.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import UpdateModelMixin

from ..models import Stats
from ..serializers import StatsSerializer


class Stats(GenericAPIView, UpdateModelMixin):
    """
    @auth-required: yes
    @method-supported: GET, PUT
    @GET: 
        @return: 
            keys:
                games_won
                games_lost
            value: positive integers representing the games won/lost.
    @PUT: 
        @param stat-type:
            key: games_(won|lost)
            value: positive integer to set the respective field to.
        @return: the newly-updated games_won and games_lost, akin to GET.
    """
    queryset = Stats.objects.all()
    serializer_class = StatsSerializer

    def get(self, request, format='json'):
        stats = StatsSerializer(request.user.stats)
        return Response(stats.data)

    def get_object(self):
        return self.request.user.stats

    def put(self, request, format='json'):
        # TODO(benjibrandt): make sure this is only allowed post-winning/losing a game
        return self.partial_update(request)
