from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Article
from .serializers import ArticleSerializer


class SearchListView(generics.ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self, *args, **kwargs):
        qs = super().get_queryset(*args, **kwargs)
        q = self.request.GET.get('q')
        user = None  # Define user variable here
        if self.request.user.is_authenticated:
            user = self.request.user
        results = qs.search(q, user=user)
        return results

class ArticleListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ArticleDetailView(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'slug'

class ArticleUpdateView(generics.UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]
    # lookup_field = 'slug'

    def perform_update(self, serializer):
        article = self.get_object()
        a = article.creted_by = self.request.user
        print(article.creted_by)

        if article.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to update this article.")
        serializer.save()

class ArticleDeleteView(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]
    # lookup_field = 'slug'

    def perform_destroy(self, instance):
        if instance.created_by != self.request.user:
            raise PermissionDenied("You do not have permission to delete this article.")
        instance.delete()




# class ArticleUpdateAPIView(
#     UserQuerySetMixin,
#     StaffEditorPermissionMixin,
#     generics.UpdateAPIView):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     lookup_field = 'pk'
#     def perform_update(self, serializer):
#         instance = serializer.save()
#         if not instance.body:
#             instance.body = instance.title

# class ArticleDeleteAPIView(
#     UserQuerySetMixin,
#     StaffEditorPermissionMixin,
#     generics.DestroyAPIView):

#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer

#     lookup_field = 'pk'
#     def perform_destory(self, instance):
#         #instance
#         super().perform_destroy(instance)

