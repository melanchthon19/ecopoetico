import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecopoetico.settings')
application = get_wsgi_application()
#settings.configure(DEBUG=False)
from betopoem.models import PoemSubCorpus
import pandas as pd
import unidecode

def update_cosine_instances():
    df = pd.read_csv('cosine_similarity_subcorpus_10.csv')
    for index, row in df.iterrows():
        base = row['base']
        similars = []
        for i in range(1, 11):
            similars.append(row[str(i)])
        #print(base, similars)
        poembase = PoemSubCorpus.objects.get(slug=base)
        for sim in similars:
            poemsim = PoemSubCorpus.objects.get(slug=sim)
            poembase.similars.add(poemsim)

def update_keywords_instances():
    df = pd.read_csv('cosine_similarity_cskwords.csv')
    error = 0
    for index, row in df.iterrows():
        title = '-'.join(row['poem'].lower().split())
        slug = unidecode.unidecode('-'.join([row['author'], title]))
        kw = row['keywords']
        try:
            poembase = PoemSubCorpus.objects.get(slug=slug)
            poembase.keywords = kw
            poembase.save()
        except Exception as e:
            print(slug, e)
            error += 1
    print(error)

#update_cosine_instances()
#update_keywords_instances()
