import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecopoetico.settings')
application = get_wsgi_application()
#settings.configure(DEBUG=False)
from betopoem.models import PoemSubCorpus

import unidecode

# Read the text file and create instances of the model
def create_instances_from_files(author):
    file_path = os.path.join('corpus', author)
    for filename in os.listdir(file_path):
        if filename.endswith('.txt'):
            with open(os.path.join(file_path, filename), 'r') as file:
                content = file.read()
                title = filename[:-4]
                slug = unidecode.unidecode('-'.join([author, title.replace(' ', '-')]).lower())
                if not PoemSubCorpus.objects.filter(slug=slug).exists():
                    instance = PoemSubCorpus(slug=slug, title=title, author=author.title().replace('-', ' '), content=content)
                    instance.save()

authors = ['alejandra-pizarnik',
           'alfonsina-storni', 
           'alfonso-reyes', 
           'catulo', 
           'cesar-vallejo', 
           'emily-dickinson',
           'mario-benedetti',
           'vicente-huidobro',
           'jaime-sabines',
           'tirso-de-molina',
]

if __name__ == '__main__':
    # subcorpus
    for author in authors:
        create_instances_from_files(author)
             
