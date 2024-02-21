from django.urls import path
from .views import (
    ArticleListCreateView,
    ArticleCreateView,
    ArticleDetailView,
    ArticleUpdateView,
    ArticleDeleteView,
    SearchListView
 
)
urlpatterns = [
    path('', ArticleListCreateView.as_view(), name='article-create-list'),
    path('create/', ArticleCreateView.as_view(), name='article-create'),
    path('detail/<str:slug>/', ArticleDetailView.as_view(), name='article-detail'),
    path('update/<int:pk>/', ArticleUpdateView.as_view(), name='article-update'),
    path('delete/<int:pk>/', ArticleDeleteView.as_view(), name='article-delete'),
    path('search/', SearchListView.as_view(), name='article-search'),
]
