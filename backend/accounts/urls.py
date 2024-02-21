from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.UserTokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('register/', views.RegisterView.as_view()),
]
