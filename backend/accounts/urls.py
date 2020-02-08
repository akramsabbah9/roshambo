# accounts/urls.py

from django.urls import path, re_path
from .views import active_users, current_user, Login, Logout, Register, users

urlpatterns = [
    path('users/current/', current_user),
    path('users/', users),
    path('users/active/', active_users),
    re_path(r'signup|register/$', Register.as_view(), name='account-create'),
    re_path(r'signin|login/$', Login.as_view(), name='account-login'),
    re_path(r'signout|logout/$', Logout.as_view(), name='account-logout')
]
