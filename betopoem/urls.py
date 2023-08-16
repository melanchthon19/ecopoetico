from . import views
from django.urls import path


urlpatterns = [
    path('', views.home, name='home'),
    path('poem/<slug:slug>/', views.PoemDetail.as_view(), name='poem_detail'),
    path('react_test/', views.ReactTemplateView.as_view(), name='react_template'),
    path('api/poems/', views.PoemsList.as_view(), name='get_poems'),
    # path to api/poems/:pid
    path('api/poems/<str:pid>/similar', views.PoemSimilars.as_view(), name='get_poem'),
]