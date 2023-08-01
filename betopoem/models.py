from django.db import models
from django.urls import reverse

class Poem(models.Model):
    slug = models.SlugField(max_length=200, unique=True)
    title = models.CharField(max_length=200, null=True)
    author = models.CharField(max_length=200, null=True)
    content = models.TextField(blank=True, null=True)
    similars = models.ManyToManyField('self', blank=True, symmetrical=False)
    detail_url = models.CharField(max_length=200, null=True, blank=True)

    def get_absolute_url(self):
        if self.detail_url:
            return self.detail_url
        else:
            return reverse('poem_detail', kwargs={'slug': self.slug})
    
    class Meta:
        ordering = ['-title']

    def __str__(self):
        return self.title

class PoemSubCorpus(models.Model):
    slug = models.SlugField(max_length=200, unique=True)
    title = models.CharField(max_length=200, null=True)
    author = models.CharField(max_length=200, null=True)
    content = models.TextField(blank=True, null=True)
    similars = models.ManyToManyField('self', blank=True, symmetrical=False)
    keywords = models.TextField(max_length=1000, null=True, blank=True)
    detail_url = models.CharField(max_length=200, null=True, blank=True)

    def get_absolute_url(self):
        if self.detail_url:
            return self.detail_url
        else:
            return reverse('poem_detail', kwargs={'slug': self.slug})
    
    class Meta:
        ordering = ['-title']

    def __str__(self):
        return self.title