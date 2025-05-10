from django.urls import path
from . import views


urlpatterns = [
    path('', views.HomePage, name="HomePage"),
    # path('/', views.HomePage, name="HomePage"),
]

