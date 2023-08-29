from . import views
from django.urls import path


urlpatterns = [
    path('', views.ReactTemplateView.as_view(), name='react_template'),
    path('/old', views.home, name='home'),
    path('poem/<slug:slug>/', views.PoemDetail.as_view(), name='poem_detail'),
    path('api/poems/', views.PoemsList.as_view(), name='get_poems'),
    path('api/poems/<str:pid>/similar', views.PoemSimilars.as_view(), name='get_poem'),
    path('api/poems/print', views.PrintPoems.as_view(), name='print_poems'),
]