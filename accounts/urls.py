
from django.urls import path, include
from .views import CreateUser

urlpatterns = [
    path('logup/', CreateUser, name='logup'),
]
