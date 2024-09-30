from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic
from .models import Poem, PoemSubCorpus, PoemCorpus
from .serializers import PoemSerializer, PoemSubCorpusSerializer, PoemCorpusSerializer
from rest_framework.views import APIView, status, Response

import re
from .printable import data2print

import os
import random
from django.conf import settings


def home(request):
    poems = PoemCorpus.objects.order_by('?').all()
    return render(request, 'home.html', context={'poem_list': poems})

class PostList(generic.ListView):
    model = PoemCorpus
    template_name = 'poem_list.html'
    context_object_name = 'poem_list'
    paginate_by = 10

class PoemDetail(generic.DetailView):
    model = PoemCorpus
    template_name = 'poem_detail.html'
    context_object_name = 'poem'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        
        # Add click sound
        sound_click_path = 'sounds/general/warpdown-thehorriblejoke-freesound.mp3'
        context['click_sound_file'] = sound_click_path
        
        # Add random poem sound
        # Path where your sound files are stored, adjust as needed
        sound_files_path = 'sounds/poems'
        sound_files_dir = os.path.join(settings.BASE_DIR, 'static', sound_files_path)
        sound_files = [f for f in os.listdir(sound_files_dir) if os.path.isfile(os.path.join(sound_files_dir, f))]
        
        # Select a random sound file
        if sound_files:
            random_sound_file = random.choice(sound_files)
            # Save the relative path to the selected sound file to use in the template
            context['random_sound_file'] = os.path.join(sound_files_path, random_sound_file)
        else:
            # Handle case where no sound files are found
            context['random_sound_file'] = None

        return context

class ReactTemplateView(generic.TemplateView):
    template_name = 'dist/index.html'  # Replace 'your_react_template.html' with the path to your React index.html

class PoemsList(APIView):
    def get(self, request):      
        N_poems = 100
        random_param = request.query_params.get('random')
        
        if random_param == 'true':
            poems = PoemCorpus.objects.order_by('?').all()
        else:
            poems = PoemCorpus.objects.order_by('title').all()

        serializer = PoemCorpusSerializer(poems[:N_poems], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PoemSimilars(APIView):
    def get(self, request, pid):
        try:
            poem = PoemCorpus.objects.get(id=pid)
        except:
            error_message = {'error': 'Poem not found.'}
            return Response(error_message, status=status.HTTP_404_NOT_FOUND)
        similars = poem.similars.order_by('?').all()
        serializer = PoemCorpusSerializer(similars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PrintPoems(APIView):
    def post(self, request):
        data = request.data
        content = data2print(data)
        # Create an HttpResponse with the content
        response = HttpResponse(content, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename="poems.txt"'

        #return Response({'result': 'success'}, status=status.HTTP_200_OK)
        return response

class RandomSound(APIView):
    def get(self, request):
        # Path where your sound files are stored
        sound_files_path = 'sounds/poems'
        sound_files_dir = os.path.join(settings.STATIC_ROOT, sound_files_path)
        sound_files = [f for f in os.listdir(sound_files_dir) if os.path.isfile(os.path.join(sound_files_dir, f))]
        
        if sound_files:
            random_sound_file = random.choice(sound_files)
            sound_url = os.path.join(settings.STATIC_URL, sound_files_path, random_sound_file)
            return Response({'url': sound_url})
        else:
            return Response({'error': 'No sound files found'}, status=status.HTTP_404_NOT_FOUND)

class ClickSound(APIView):
    def get(self, request):
        # Path to your click sound file
        sound_click_path = 'sounds/general/warpdown-thehorriblejoke-freesound.mp3'
        sound_url = os.path.join(settings.STATIC_URL, sound_click_path)
        return Response({'url': sound_url})

