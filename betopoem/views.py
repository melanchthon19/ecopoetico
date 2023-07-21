from django.shortcuts import render
from django.views import generic
from .models import Poem


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