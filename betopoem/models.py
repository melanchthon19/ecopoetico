from django.db import models
from django.urls import reverse

class PoemCorpus(models.Model):
    slug = models.SlugField(max_length=200, unique=True)  # Unique slug for the poem (author-formattedtitle)
    title = models.CharField(max_length=200, null=True)   # The title of the poem
    author = models.CharField(max_length=200, null=True)  # The author of the poem
    content = models.TextField(blank=True, null=True)     # Full text of the poem
    keywords = models.TextField(max_length=1000, null=True, blank=True)  # Keywords related to the poem
    similars = models.ManyToManyField('self', blank=True, symmetrical=False)  # Similar poems (relationships)

    # Optional external detail URL for the poem
    detail_url = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        ordering = ['title']  # Default ordering by title

    def get_absolute_url(self):
        """Generates the URL for this poem, either based on a custom URL or its default detail view."""
        if self.detail_url:
            return self.detail_url
        return reverse('poem_detail', kwargs={'slug': self.slug})  # URL routing for poem details
    
    def __str__(self):
        """String representation: returns the poem's title."""
        return self.title
    
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