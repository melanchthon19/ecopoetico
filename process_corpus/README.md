# Corpus Processing and Similarity Generation
Within this app, run `./process_corpus.sh`.

It takes `corpus` folder and generates a preprocessed corpus, along with similarities.
Folders generated:
- `corpus_prep` (filtered poems)
- `corpus_pt` (embeddings)
- `logs` (errors)
- `similarity` (most similar poems and keywords)

Once data is generated, run `python manage.py upload_poems` from root directory to load data to django models.

It assumes the following model in `models.py`:
```
class PoemCorpus(models.Model):
    slug = models.SlugField(max_length=200, unique=True)  # Unique slug for the poem (author-formattedtitle)
    title = models.CharField(max_length=200, null=True)   # The title of the poem
    author = models.CharField(max_length=200, null=True)  # The author of the poem
    content = models.TextField(blank=True, null=True)     # Full text of the poem
    keywords = models.TextField(max_length=1000, null=True, blank=True)  # Keywords related to the poem
    similars = models.ManyToManyField('self', blank=True, symmetrical=False)  # Similar poems (relationships)

    # Optional external detail URL for the poem
    detail_url = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        ordering = ['title']  # Default ordering by title

    def get_absolute_url(self):
        """Generates the URL for this poem, either based on a custom URL or its default detail view."""
        if self.detail_url:
            return self.detail_url
        return reverse('poem_detail', kwargs={'slug': self.slug})  # URL routing for poem details
    
    def __str__(self):
        """String representation: returns the poem's title."""
        return self.title
```