import os
import torch
import csv
import numpy as np
import pandas as pd
from tqdm import tqdm
from sklearn.metrics.pairwise import cosine_similarity

# Function to load embeddings from the corpus_pt folder with progress tracking
def load_embeddings(input_folder):
    embeddings = []
    poem_files = []
    
    authors = os.listdir(input_folder)
    
    for author in tqdm(authors, desc="Loading Embeddings (Authors)"):
        author_folder = os.path.join(input_folder, author)
        if os.path.isdir(author_folder):
            poem_files_in_author = os.listdir(author_folder)
            for poem_file in tqdm(poem_files_in_author, desc=f"Loading Embeddings (Poems in {author})", leave=False):
                if poem_file.endswith('.pt'):
                    poem_path = os.path.join(author_folder, poem_file)
                    poem_files.append(poem_path)
                    embedding = torch.load(poem_path)
                    embeddings.append(embedding.numpy())  # Convert tensor to numpy array
    
    embeddings = np.vstack(embeddings)  # Stack into a single array (N, 768)
    return embeddings, poem_files

# Function to compute the similarity matrix (can change metric easily)
def compute_similarity_matrix(embeddings, metric='cosine'):
    if metric == 'cosine':
        # Compute cosine similarity using sklearn
        similarity_matrix = cosine_similarity(embeddings)
    else:
        raise ValueError(f"Unsupported metric: {metric}")
    
    return similarity_matrix

# Function to generate a CSV with the 30 most similar poems (excluding the poem itself)
def generate_top_k_similarity_csv(similarity_matrix, poem_files, output_csv='similarity_matrix.csv', top_k=30):
    # Generate poem paths in the form of "author/filename" (excluding "corpus")
    poem_names = [os.path.join(os.path.basename(os.path.dirname(poem_file)), os.path.basename(poem_file)) for poem_file in poem_files]

    # Open the CSV file for writing
    with open(output_csv, mode='w', newline='', encoding='utf-8') as csv_file:
        writer = csv.writer(csv_file)

        # Write the header (Poem and the top 30 most similar poem names, lowercase)
        header = ['poem'] + [f'top_{i+1}_similar' for i in range(top_k)]
        writer.writerow(header)

        # Process each poem and sort the similarities
        for i, poem_name in tqdm(enumerate(poem_names), total=len(poem_names), desc="Sorting and Saving Top Similarities"):
            row = similarity_matrix[i, :]  # Get the similarity scores for the current poem
            sorted_poem_indices = row.argsort()[::-1]  # Sort indices by similarity score, descending

            # Exclude the poem itself from the results
            sorted_poem_indices = sorted_poem_indices[sorted_poem_indices != i]

            # Get the top K most similar poems
            top_k_poem_indices = sorted_poem_indices[:top_k]
            top_k_poem_names = [poem_names[idx] for idx in top_k_poem_indices]  # Get the corresponding author/poem paths

            # Write the row to the CSV (first column is the poem itself, followed by top_k most similar poems)
            writer.writerow([poem_name] + top_k_poem_names)


def main():
    # Define input and output paths
    input_folder = 'corpus_pt'  # Folder with embeddings
    output_csv = 'similarity_matrix.csv'  # Output CSV for similarity

    # Load embeddings from the corpus_pt folder with progress tracking
    embeddings, poem_files = load_embeddings(input_folder)
    
    # Compute the similarity matrix (cosine by default, but can be changed)
    similarity_matrix = compute_similarity_matrix(embeddings, metric='cosine')
    
    # Generate the CSV file with ordered similarities
    generate_top_k_similarity_csv(similarity_matrix, poem_files, output_csv)

if __name__ == "__main__":
    main()
