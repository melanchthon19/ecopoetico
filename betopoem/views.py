from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views import generic
from .models import Poem, PoemSubCorpus
from .serializers import PoemSerializer, PoemSubCorpusSerializer
from rest_framework.views import APIView, status, Response

import re
from .printable import data2print

def home(request):
    poems = PoemSubCorpus.objects.order_by('?').all()
    return render(request, 'home.html', context={'poem_list': poems})

class PostList(generic.ListView):
    model = PoemSubCorpus
    template_name = 'poem_list.html'
    context_object_name = 'poem_list'
    paginate_by = 10

class PoemDetail(generic.DetailView):
    model = PoemSubCorpus
    template_name = 'poem_detail.html'
    context_object_name = 'poem'

class ReactTemplateView(generic.TemplateView):
    template_name = 'dist/index.html'  # Replace 'your_react_template.html' with the path to your React index.html

class PoemsList(APIView):
    def get(self, request):
        random_param = request.query_params.get('random')

        if random_param == 'true':
            poems = PoemSubCorpus.objects.order_by('?').all()
            # preprocessing
            # for poem in poems:
            #     lines = poem.content.split('\n')
            #     lines = [l for l in lines if l != '' and l != 'I']
            #     poem.content = '\n'.join(lines)
            # this changes poem.content displayed
        else:
            poems = PoemSubCorpus.objects.order_by('title').all()

        serializer = PoemSubCorpusSerializer(poems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PoemSimilars(APIView):
    def get(self, request, pid):
        try:
            poem = PoemSubCorpus.objects.get(id=pid)
        except:
            error_message = {'error': 'Poem not found.'}
            return Response(error_message, status=status.HTTP_404_NOT_FOUND)
        similars = poem.similars.order_by('?').all()
        serializer = PoemSubCorpusSerializer(similars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PrintPoems(APIView):
    def post(self, request):
        data = request.data
        #print(data)
        #print(type(data))
        content = data2print(data)
        # Create an HttpResponse with the content
        response = HttpResponse(content, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename="poems.txt"'

        #return Response({'result': 'success'}, status=status.HTTP_200_OK)
        return response
    
