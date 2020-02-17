# :: roshambo/routing.py
###################################################################
# Routing configuration for Channels. From the docs:
# a Channels routing configuration is similar to a Django URLconf. 
# It tells Channels what code to run when an HTTP request is received.
###################################################################
# :: Created By: Benji Brandt <benjibrandt@ucla.edu>
# :: Creation Date: 12 January 2020

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from ..matchup import routing

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})
