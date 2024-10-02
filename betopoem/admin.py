from django.contrib import admin
from .models import Poem, PoemSubCorpus, PoemCorpus

class PoemCorpusAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'slug', 'keywords')  # Columns to display in the admin list view
    search_fields = ('title', 'author', 'slug', 'keywords')  # Enable search by title, author, slug, and keywords
    list_filter = ('author',)  # Filter poems by author
    prepopulated_fields = {"slug": ("title",)}  # Auto-generate the slug based on the title

class PoemAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'slug')
    list_filter = ('author',)
    search_fields = ['author', 'title']

class PoemSubCorpusAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'slug')
    list_filter = ('author',)
    search_fields = ['author', 'title']

admin.site.register(Poem, PoemAdmin)
admin.site.register(PoemSubCorpus, PoemSubCorpusAdmin)
admin.site.register(PoemCorpus, PoemCorpusAdmin)
