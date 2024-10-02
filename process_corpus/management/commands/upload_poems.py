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
UPDATED_SIMILARITY_CSV_PATH = os.path.join(BASE_DIR, 'process_corpus/similarity/similarity_matrix_with_slugs.csv')

# Dictionary to store poem slugs for easier reference later
poem_slugs = {}

def load_title_mapping(mapping_file):
    """Load the mapping between formatted titles and original titles."""
    title_mapping = {}
    with open(mapping_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            author = row['author']
            formatted_title = row['formatted_title'].replace('.txt', '')  # Remove .txt extension for slugs
            original_title = row['original_title']
            # Ensure slug consistency: author-formattedtitle (author and title without special chars)
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

def generate_slug(author, formatted_title):
    """Generate a consistent slug for the poem."""
    return f"{author}-{formatted_title}"

def update_similarity_csv_with_slugs(similarity_file, output_file):
    """Load the similarity matrix, generate slugs, and add a new column with the generated slugs."""
    updated_rows = []
    
    with open(similarity_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        fieldnames = reader.fieldnames + ['slug']  # Add a new column for the slug
        
        for row in reader:
            # Generate the slug for each poem based on the author and title
            poem_slug = row['poem'].replace('.pt', '')  # Clean the poem slug
            slug_parts = poem_slug.split('/')  # Split author and title
            author, formatted_title = slug_parts[0], slug_parts[1]
            generated_slug = generate_slug(author, formatted_title)
            
            # Add the generated slug to the row
            row['slug'] = generated_slug
            
            # Store the slug for later use in similarity relationships
            poem_slugs[poem_slug] = generated_slug
            
            updated_rows.append(row)
    
    # Write the updated CSV with the new slug column
    with open(output_file, mode='w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(updated_rows)
    
    print(f"Updated similarity CSV with slugs saved to {output_file}")

def load_similarity_with_slugs(similarity_file):
    """Load the updated similarity matrix with slugs from the CSV."""
    similarity_mapping = {}
    
    with open(similarity_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            poem_slug = row['slug']  # Use the generated slug from the new column
            # Create a list of similar poems (up to 30)
            similar_poems = [poem_slugs.get(row[f"top_{i+1}_similar"].replace('.pt', ''), None) for i in range(30) if row[f"top_{i+1}_similar"]]
            similarity_mapping[poem_slug] = [s for s in similar_poems if s]  # Filter out None values
    return similarity_mapping

class Command(BaseCommand):
    help = "Uploads poems to the corpus, ensuring slugs are consistent"

    def handle(self, *args, **options):
        # Step 0: Clean the PoemCorpus table before uploading new data
        clean_corpus()
        print("PoemCorpus table cleaned.")

        # Step 1: Update similarity CSV with slugs
        update_similarity_csv_with_slugs(SIMILARITY_CSV_PATH, UPDATED_SIMILARITY_CSV_PATH)
        
        # Step 2: Upload poems without similarity relationships
        upload_poems()
        print("First pass: all poems uploaded.")
        
        # Step 3: Upload similarity relationships using updated slugs
        upload_similarities()
        print("Second pass: all similarity relationships added.")

def clean_corpus():
    """Delete all entries in the PoemCorpus model to start fresh."""
    PoemCorpus.objects.all().delete()
    print("All existing poems deleted from the database.")

def upload_poems():
    """Upload poems from the corpus_prep folder to the PoemCorpus model."""
    print("Uploading poems from 'corpus_prep'...")

    # Load the title mapping and keywords
    title_mapping = load_title_mapping(MAPPING_FILE)
    keywords_mapping = load_keywords(KEYWORDS_CSV_PATH)

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
                    slug = generate_slug(author, formatted_title)

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

                        print(f"Poem '{original_title}' by {author} uploaded.")
                    else:
                        print(f"Poem '{original_title}' by {author} already exists.")

def upload_similarities():
    """Second pass: add similarity relationships after all poems have been uploaded."""
    print("Adding similarity relationships...")
    
    # Load the updated similarity data with slugs
    similarity_mapping = load_similarity_with_slugs(UPDATED_SIMILARITY_CSV_PATH)

    # Iterate through the similarity relationships
    for slug, similar_slugs in similarity_mapping.items():
        try:
            poem_instance = PoemCorpus.objects.get(slug=slug)
            for similar_slug in similar_slugs:
                try:
                    similar_poem = PoemCorpus.objects.get(slug=similar_slug)
                    poem_instance.similars.add(similar_poem)
                    print(f"Added similar poem '{similar_slug}' to '{slug}'")
                except PoemCorpus.DoesNotExist:
                    print(f"Similar poem with slug '{similar_slug}' not found for '{slug}'")
            poem_instance.save()
        except PoemCorpus.DoesNotExist:
            print(f"Poem with slug '{slug}' not found during similarity upload.")
