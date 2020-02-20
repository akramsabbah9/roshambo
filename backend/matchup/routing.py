# matchup/routing.py

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from .consumers import MatchmakingConsumer
from .authentication import TokenAuthMiddleware

websocket_urlpatterns = [
    re_path(r'ws/match/$', MatchmakingConsumer),
]

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': TokenAuthMiddleware(
        URLRouter(
            websocket_urlpatterns
        )
    ),
    #'channel': ChannelNameRouter({'arbiter1', ArbiterConsumer}),
    # the channel name is arbiter1 just in case of name collisions
})
