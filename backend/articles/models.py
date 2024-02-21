from django.db import models
from django.conf import settings
from django.db.models import Q


User = settings.AUTH_USER_MODEL


# Create your models here.


# class ArticleQuerySet(models.QuerySet):
#     def search(self,query = None):
#         if query is None or query == "":
#             return self.none() # []
#         lookups = Q(title__icontains = query) | Q(content__icontains = query)
#         return self.filter(lookups) ## this is now reusable

# class ArticleManeger(models.Manager):
#     def get_queryset(self):
#         return ArticleQuerySet(self.model, using=self._db)

#     def search(self, query = None):
#         return self.get_queryset().search(query=query)


class ArticleQuerySet(models.QuerySet):
    def search(self, query, user=None):
        lookup = Q(title__icontains=query) | Q(content__icontains=query)
        qs = self.filter(lookup)
        if user is not None:
            qs = qs.filter(created_by=user)
        return qs


class ArticleManager(models.Manager):
    def get_queryset(self,*args, **kwargs):
        return ArticleQuerySet(self.model,using=self._db) 
    def search(self, query, user= None):
        return self.get_queryset().search(query, user=user)
    



class Article(models.Model):
    slug = models.SlugField(unique=True, blank=True)
    featured_image = models.ImageField(blank=True, null=True)
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    objects = ArticleManager()

