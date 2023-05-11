
from django.urls import path

from . import views

urlpatterns = [
    path("", views.Home, name='blog'),
    path("hv/", views.Hv, name='blog'),
    path("about/", views.About, name='about'),
    path("tools/", views.Tools, name='tools-blog'),
]