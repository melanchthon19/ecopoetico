import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecopoetico.settings')
application = get_wsgi_application()
#settings.configure(DEBUG=False)
from betopoem.models import PoemSubCorpus
import pandas as pd
import unidecode


def delete_poems_without_similars():
    to_delete = PoemSubCorpus.objects.filter(similars__isnull=True)
    print(len(to_delete))
    for poem in to_delete:
        print(poem.slug)
    #to_delete.delete()


delete_poems_without_similars()
