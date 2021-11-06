from chat import views
from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken


router = routers.DefaultRouter()

urlpatterns = [
    url(r'^send_message/', views.send_message),
    url(r'^get_inbox/', views.get_inbox),
    url(r'^get_conversation/', views.get_conversation),

    path('', views.index, name='index'),
    path('history/<str:room_id>/', views.history, name='history'),
    path('unauthorized/', views.unauthorized, name='unauthorized'),
    path('<str:group_id>/', views.room, name='room'),
]
