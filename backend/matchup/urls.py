from django.urls import path

from . import views

urlpatterns = [
    path('', views.match, name='matcher'),
    path('<str:room_name>/', views.room, name='room'),
]
