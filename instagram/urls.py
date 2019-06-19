from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.home, name='instagram-home'),
    path('/like', views.like, name='instagram-like'),
]