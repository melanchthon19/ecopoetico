from django.shortcuts import render
from django.views import generic
from .models import Poem
from .serializers import PoemSerializer


def home(request):
    poems = Poem.objects.order_by('?').all()
    return render(request, 'home.html', context={'poem_list': poems})

class PostList(generic.ListView):
    model = Poem
    template_name = 'poem_list.html'
    context_object_name = 'poem_list'
    paginate_by = 10

class PoemDetail(generic.DetailView):
    model = Poem
    template_name = 'poem_detail.html'
    context_object_name = 'poem'

class ReactTemplateView(generic.TemplateView):
    template_name = 'dist/index.html'  # Replace 'your_react_template.html' with the path to your React index.html

class PoemsList(APIView):
    def get(self, request):
        random_param = request.query_params.get('random')

        if random_param == 'true':
            poems = Poem.objects.order_by('?').all()
        else:
            poems = Poem.objects.order_by('title').all()

        serializer = PoemSerializer(poems, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)