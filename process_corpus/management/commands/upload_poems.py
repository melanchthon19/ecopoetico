import os
import csv
from django.conf import settings
from django.core.management.base import BaseCommand
from betopoem.models import PoemCorpus

# Base directory of the project (adjust as needed)
BASE_DIR = settings.BASE_DIR

# Paths to important files (updated to use absolute paths)
CORPUS_PREP_PATH = os.path.join(BASE_DIR, 'process_corpus/corpus_prep')
MAPPING_FILE = os.path.join(BASE_DIR, 'process_corpus/similarity/original_to_formatted_titles.csv')
KEYWORDS_CSV_PATH = os.path.join(BASE_DIR, 'process_corpus/similarity/keywords_tfidf_by_author.csv')
SIMILARITY_CSV_PATH = os.path.join(BASE_DIR, 'process_corpus/similarity/similarity_matrix.csv')

def load_title_mapping(mapping_file):
    """Load the mapping between formatted titles and original titles."""
    title_mapping = {}
    with open(mapping_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            author = row['author']
            formatted_title = row['formatted_title'].replace('.txt', '')  # Remove .txt extension for slugs
            original_title = row['original_title']
            title_mapping[f"{author}-{formatted_title}"] = original_title
    return title_mapping

def load_keywords(keywords_file):
    """Load keywords from the CSV."""
    keywords_mapping = {}
    with open(keywords_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            poem_slug = f"{row['author']}-{row['poem'].replace('.txt', '')}"  # Author-formatted_title
            keywords_mapping[poem_slug] = row['keywords']
    return keywords_mapping

def load_similarity(similarity_file):
    """Load similarity matrix from CSV."""
    similarity_mapping = {}
    with open(similarity_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            poem_slug = row['poem'].replace('.pt', '')  # Remove .pt extension from similarity matrix slugs
            similar_poems = [row[f"top_{i+1}_similar"].replace('.pt', '') for i in range(30) if row[f"top_{i+1}_similar"]]
            similarity_mapping[poem_slug] = similar_poems
    return similarity_mapping

class Command(BaseCommand):
    help = "Uploads poems to the corpus"

    def handle(self, *args, **options):
        upload_poems()
        print("All data uploaded successfully.")

def upload_poems():
    """Upload poems from the corpus_prep folder to the PoemCorpus model."""
    print("Uploading poems from 'corpus_prep'...")

    # Load the title mapping, keywords, and similarities
    title_mapping = load_title_mapping(MAPPING_FILE)
    keywords_mapping = load_keywords(KEYWORDS_CSV_PATH)
    similarity_mapping = load_similarity(SIMILARITY_CSV_PATH)

    # Iterate through each author folder in the corpus_prep directory
    for author in os.listdir(CORPUS_PREP_PATH):
        author_folder = os.path.join(CORPUS_PREP_PATH, author)
        if os.path.isdir(author_folder):
            for poem_file in os.listdir(author_folder):
                if poem_file.endswith('.txt'):
                    # Extract formatted title (without .txt) and content of the poem
                    formatted_title = poem_file.replace('.txt', '')
                    poem_path = os.path.join(author_folder, poem_file)

                    with open(poem_path, 'r', encoding='utf-8') as f:
                        content = f.read()

                    # Create the slug as author-formattedtitle
                    slug = f"{author}-{formatted_title}"

                    # Look up the original title in the title mapping
                    original_title = title_mapping.get(slug, formatted_title.replace('-', ' ').title())

                    # Check if the poem already exists in the database
                    if not PoemCorpus.objects.filter(slug=slug).exists():
                        # Create and save the PoemCorpus instance
                        poem_instance = PoemCorpus(
                            slug=slug,
                            title=original_title,  # Use the original title from the mapping
                            author=author.replace('-', ' ').title(),  # Format author name
                            content=content,
                            keywords=keywords_mapping.get(slug, "")  # Fetch keywords or set as empty string
                        )
                        poem_instance.save()

                        # Add similarity relationships
                        similar_slugs = similarity_mapping.get(slug, [])
                        for similar_slug in similar_slugs:
                            try:
                                similar_poem = PoemCorpus.objects.get(slug=similar_slug)
                                poem_instance.similars.add(similar_poem)
                            except PoemCorpus.DoesNotExist:
                                print(f"Similar poem with slug '{similar_slug}' not found for '{slug}'")

                        poem_instance.save()
                        print(f"Poem '{original_title}' by {author} uploaded with keywords and similar poems.")
                    else:
                        print(f"Poem '{original_title}' by {author} already exists.")
