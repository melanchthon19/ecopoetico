# helper module to make a downloable file

from .models import PoemSubCorpus

def data2print(data):
    content = ["REGISTRO DE TU VIAJE POÉTICO"]
    for id in data:
        poem = PoemSubCorpus.objects.get(id=id)
        title = f"Título: {poem.title}"
        author = f"Autor/a: {poem.author}"
        text = f"{poem.content}"
        content.append('\n\n'.join([title, author, text]))
    return '\n\n'.join(content)