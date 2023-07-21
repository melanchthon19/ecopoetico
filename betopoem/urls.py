from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='home'),
    path('poem/<slug:slug>/', views.PoemDetail.as_view(), name='poem_detail'),
]