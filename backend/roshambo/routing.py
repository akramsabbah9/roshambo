# :: roshambo/routing.py
###################################################################
# Routing configuration for Channels. From the docs:
# a Channels routing configuration is similar to a Django URLconf. 
# It tells Channels what code to run when an HTTP request is received.
###################################################################
# :: Created By: Benji Brandt <benjibrandt@ucla.edu>
# :: Creation Date: 12 January 2020

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import matchup.routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            matchup.routing.websocket_urlpatterns
        )
    ),
})
