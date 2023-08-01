from django.contrib import admin
from .models import Poem, PoemSubCorpus


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
