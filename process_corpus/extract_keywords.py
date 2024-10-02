import os
import csv
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from tqdm import tqdm

# Download the Spanish stop words list from NLTK
nltk.download('stopwords')
stop_words = set(stopwords.words('spanish'))  # Load Spanish stop words

# Initialize the error log file
error_log_file = 'error_log_extract_keywords.txt'

# Function to log errors (skipped poems)
def log_error(message, log_file=error_log_file):
    with open(log_file, 'a') as log:
        log.write(f"{message}\n")

# Function to filter content words by removing stop words
def get_content_words(text):
    words = text.split()  # Split text into words
    content_words = [word.lower() for word in words if word.lower() not in stop_words and word.isalpha()]
    return content_words

# Function to process poems by author and extract content words
def extract_content_words_by_author(input_folder):
    author_poems = {}

    # Process each author's folder
    for author in tqdm(os.listdir(input_folder), desc='Extracting content words'):
        author_folder = os.path.join(input_folder, author)
        if os.path.isdir(author_folder):
            poem_texts = []
            poem_files = []
            content_words_by_poem = []

            for poem_file in os.listdir(author_folder):
                if poem_file.endswith('.txt'):
                    poem_path = os.path.join(author_folder, poem_file)

                    # Read the poem text
                    with open(poem_path, 'r', encoding='utf-8') as f:
                        poem_text = f.read()

                    # Get content words by filtering stop words
                    content_words = get_content_words(poem_text)

                    # Check if content words are non-empty (i.e., not all stop words)
                    if content_words:
                        # Store the poem text and content words for this author
                        poem_texts.append(' '.join(content_words))  # Join the words as text for TF-IDF
                        poem_files.append(poem_file)
                        content_words_by_poem.append(content_words)
                    else:
                        # If the poem has no content words (only stop words), log it
                        log_error(f"Skipping {poem_file}: no content words found.")

            # Only add the author's poems if there's at least one valid poem
            if poem_texts:
                author_poems[author] = {
                    'texts': poem_texts,  # Processed content words joined as text
                    'files': poem_files,
                    'content_words': content_words_by_poem
                }
            else:
                # If an author has no valid poems, log it
                log_error(f"Skipping author {author}: no valid poems found.")

    return author_poems

# Function to compute TF-IDF scores and select the top keywords for each author
def select_keywords_tfidf_by_author(author_poems, ratio=1/3):
    keywords_by_author = {}

    # Process each author separately
    for author, data in tqdm(author_poems.items(), desc="Processing authors"):
        poem_texts = data['texts']
        poem_files = data['files']
        content_words_by_poem = data['content_words']

        # Ensure the author has at least one valid poem
        if poem_texts:
            # Compute TF-IDF scores for this author's poems
            tfidf = TfidfVectorizer()
            tfidf_matrix = tfidf.fit_transform(poem_texts)
            feature_names = tfidf.get_feature_names_out()

            keywords_by_poem = []

            # Process each poem's content words
            for i, content_words in enumerate(content_words_by_poem):
                # Get the TF-IDF scores for this poem
                tfidf_scores = tfidf_matrix[i].toarray().flatten()

                # Create a mapping of word to TF-IDF score
                word_tfidf = {word: tfidf_scores[tfidf.vocabulary_[word]] for word in content_words if word in tfidf.vocabulary_}

                # Sort words by TF-IDF scores and select the top N (based on ratio)
                num_keywords = max(1, int(ratio * len(content_words)))
                top_keywords = sorted(word_tfidf, key=word_tfidf.get, reverse=True)[:num_keywords]

                keywords_by_poem.append(top_keywords)

            keywords_by_author[author] = {
                'poem_files': poem_files,
                'keywords_by_poem': keywords_by_poem
            }
        else:
            log_error(f"Skipping author {author}: no valid poems for TF-IDF computation.")

    return keywords_by_author

# Function to write the results to a CSV file
def write_keywords_to_csv_by_author(keywords_by_author, output_csv='keywords_tfidf_by_author.csv'):
    with open(output_csv, mode='w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['author', 'poem', 'keywords'])

        # Process each author and their poems
        for author, data in keywords_by_author.items():
            poem_files = data['poem_files']
            keywords_by_poem = data['keywords_by_poem']

            for poem_file, keywords in zip(poem_files, keywords_by_poem):
                keywords_str = '-'.join(keywords)  # Join keywords with hyphen
                writer.writerow([author, poem_file, keywords_str])

# Main function to process the poems and extract keywords by author
def extract_keywords_by_author(input_folder, output_csv='keywords_tfidf_by_author.csv', ratio=1/3):
    # Clear the error log before starting
    with open(error_log_file, 'w') as log:
        log.write("Error Log for Extract Keywords Process:\n")

    # Extract content words from poems grouped by author
    author_poems = extract_content_words_by_author(input_folder)

    # Select keywords using TF-IDF for each author
    keywords_by_author = select_keywords_tfidf_by_author(author_poems, ratio)

    # Write the keywords to a CSV file
    write_keywords_to_csv_by_author(keywords_by_author, output_csv)

if __name__ == "__main__":
    input_folder = 'corpus_prep'  # Folder containing the poems
    output_csv = 'keywords_tfidf_by_author.csv'  # Output CSV for keywords
    extract_keywords_by_author(input_folder, output_csv)
