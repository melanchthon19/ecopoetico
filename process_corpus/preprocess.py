import os
import re
import shutil
import unicodedata
import csv
from tqdm import tqdm

def load_corpus(main_folder='corpus'):
    file_dict = {}
    for root, dirs, files in os.walk(main_folder):
        for file in files:
            if file.endswith('.txt'):
                author = os.path.basename(root)
                if author not in file_dict:
                    file_dict[author] = []
                file_dict[author].append(os.path.join(root, file))

    return file_dict

def remove_duplicates(file_dict):
    seen_poems = set()
    unique_file_dict = {}
    duplicates = []

    for author, paths in tqdm(file_dict.items(), desc="Removing Duplicates"):
        unique_file_dict[author] = []
        for path in paths:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
            title = os.path.basename(path)
            
            if content not in seen_poems:
                seen_poems.add(content)
                unique_file_dict[author].append(path)
            else:
                duplicates.append(f"{author}: {title} - {path}")
    
    return unique_file_dict, duplicates

def remove_non_poems(file_dict, max_line_length=80):
    poem_file_dict = {}
    non_poems = []

    for author, paths in tqdm(file_dict.items(), desc="Removing Non-Poems"):
        poem_file_dict[author] = []
        for path in paths:
            with open(path, 'r', encoding='utf-8') as f:
                is_poem = True
                for line in f:
                    if len(line.strip()) > max_line_length:
                        is_poem = False
                        break
                if is_poem:
                    poem_file_dict[author].append(path)
                else:
                    non_poems.append(f"{author}: {os.path.basename(path)} - {path}")
    
    return poem_file_dict, non_poems

def remove_poem_too_long(file_dict, max_verses=50):
    final_file_dict = {}
    too_long_poems = []

    for author, paths in tqdm(file_dict.items(), desc="Removing Too-Long Poems"):
        final_file_dict[author] = []
        for path in paths:
            with open(path, 'r', encoding='utf-8') as f:
                verse_count = sum(1 for line in f if line.strip())  # Counting non-empty lines
            if verse_count <= max_verses:
                final_file_dict[author].append(path)
            else:
                too_long_poems.append(f"{author}: {os.path.basename(path)} - {path}")

    return final_file_dict, too_long_poems

# Function to create corpus_prep and save the mapping of original title to formatted name
def create_corpus_prep(final_file_dict, output_folder='corpus_prep', mapping_file='original_to_formatted_titles.csv'):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Open CSV file for writing the mapping of original to formatted titles
    with open(mapping_file, mode='w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['author', 'original_title', 'formatted_title']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for author, paths in tqdm(final_file_dict.items(), desc="Copying Files"):
            author_folder = os.path.join(output_folder, format_name(author, is_folder=True))
            if not os.path.exists(author_folder):
                os.makedirs(author_folder)
            
            for path in paths:
                original_title = os.path.basename(path).replace('.txt', '')
                formatted_title = format_name(original_title)

                new_file_path = os.path.join(author_folder, f"{formatted_title}")
                shutil.copy2(path, new_file_path)  # Copy the file to the new path

                # Write the original and formatted title mapping to the CSV file
                writer.writerow({
                    'author': author,
                    'original_title': original_title,
                    'formatted_title': formatted_title
                })

def format_name(name, is_folder=False):
    # Normalize to decompose accents (á -> a, ñ -> n)
    name = unicodedata.normalize('NFD', name)
    name = name.encode('ascii', 'ignore').decode('utf-8')  # Remove accents
    name = name.lower()  # Convert to lowercase
    name = name.strip()
    name = re.sub(r'\s+', ' ', name) # Replace multiple spaces with one space
    name = name.replace(' ', '-')  # Replace spaces with hyphens
    name = name.replace('.txt', '')  # Remove extension before renaming
    if is_folder:
        return name
    return f"{name}.txt"  # Return with .txt extension

def print_final_stats(load_dict, duplicates, non_poems, too_long_poems, final_dict, output_folder='corpus_prep'):
    print("\n## Initial Poems Loaded\n")
    for author, paths in load_dict.items():
        for path in paths:
            print(f"{author}: {os.path.basename(path)} - {path}")

    print("\n## Duplicates Removed\n")
    for dup in duplicates:
        print(dup)

    print("\n## Non-Poems Removed\n")
    for non_poem in non_poems:
        print(non_poem)

    print("\n## Too-Long Poems Removed\n")
    for too_long in too_long_poems:
        print(too_long)

    print("\n## Final Poems Remaining in New Folder\n")
    for author, paths in final_dict.items():
        author_folder = os.path.join(output_folder, format_name(author, is_folder=True))
        for path in paths:
            new_file_name = format_name(os.path.basename(path))
            new_file_path = os.path.join(author_folder, new_file_name)
            print(f"{new_file_path}")

    # Print final stats in Markdown format
    total_poems = sum(len(paths) for paths in load_dict.values())
    final_poems = sum(len(paths) for paths in final_dict.values())

    print("\n# Final Report\n")
    print(f"- **Total Poems Loaded**: {total_poems}")
    print(f"- **Duplicates Removed**: {len(duplicates)}")
    print(f"- **Non-Poems Removed**: {len(non_poems)}")
    print(f"- **Too-Long Poems Removed**: {len(too_long_poems)}")
    print(f"- **Final Poems Remaining**: {final_poems}")

def main():
    main_folder = 'corpus'
    file_dict = load_corpus(main_folder)

    # Step 1: Remove duplicates
    file_dict, duplicates = remove_duplicates(file_dict)

    # Step 2: Remove non-poems
    file_dict, non_poems = remove_non_poems(file_dict)

    # Step 3: Remove too-long poems
    final_file_dict, too_long_poems = remove_poem_too_long(file_dict)

    # Step 4: Create the new corpus with formatted file names and output the mapping
    create_corpus_prep(final_file_dict, output_folder='corpus_prep')

    # Print final stats and results
    print_final_stats(load_corpus(main_folder), duplicates, non_poems, too_long_poems, final_file_dict)

if __name__ == '__main__':
    main()
