
from django.urls import path

from . import views

urlpatterns = [
    path("", views.sendArticles, name='blog'),
    # path("hv/", views.hv),
]