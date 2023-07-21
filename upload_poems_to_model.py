import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecopoetico.settings')
application = get_wsgi_application()
#settings.configure(DEBUG=False)
from betopoem.models import Poem

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
                if not Poem.objects.filter(slug=slug).exists():
                    instance = Poem(slug=slug, title=title, author=author.title().replace('-', ' '), content=content)
                    instance.save()

create_instances_from_files('mario-benedetti')
create_instances_from_files('vicente-huidobro')
create_instances_from_files('jaime-sabines')
create_instances_from_files('tirso-de-molina')