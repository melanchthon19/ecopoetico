import os
from django.conf import settings
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecopoetico.settings')
application = get_wsgi_application()
#settings.configure(DEBUG=False)
from betopoem.models import Poem
import pandas as pd

def update_cosine_instances():
    df = pd.read_csv('cosine_similarity.csv')
    for index, row in df.iterrows():
        base = row['base']
        similars = []
        for i in range(1, 11):
            similars.append(row[str(i)])
        #print(base, similars)
        poembase = Poem.objects.get(slug=base)
        for sim in similars:
            poemsim = Poem.objects.get(slug=sim)
            poembase.similars.add(poemsim)

update_cosine_instances()

