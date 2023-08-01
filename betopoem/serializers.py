from rest_framework import serializers
from .models import Poem, PoemSubCorpus

class PoemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poem
        fields = ('id', 'slug', 'title', 'author', 'content', 'similars')

class PoemSubCorpusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoemSubCorpus
        fields = ('id', 'slug', 'title', 'author', 'content', 'similars', 'keywords')