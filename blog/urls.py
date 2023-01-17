
from django.urls import path

from . import views

urlpatterns = [
    path("", views.sendArticles, name='blog'),
]