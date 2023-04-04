from django.urls import path

from . import views, ApiViews

urlpatterns = [
    path("apiView", ApiViews.apiView),
    path("analyze", views.analyze_textSyntax),
    path("", views.Home, name="home"),
    path("stories/<str:pk>", views.BookView, name='stories'),
    path("desk/", views.Desk, name="desk"),
    path("metadataUpdater/<str:id>/", views.MetadataUpdater),
    path("phEditor/", views.writePhonetics, name="phEditor"),
    path("textUpdated/", views.textUpdated),
    path("develop", views.develop, name="develop"),
    path("stories/dictData/", views.DictData),
]
