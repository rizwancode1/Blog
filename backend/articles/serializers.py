from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    author_id = serializers.PrimaryKeyRelatedField(source='created_by', read_only=True)
    author = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Article
        fields = ['id', 'slug', 'featured_image', 'title', 'content', 'author_id', 'author']
