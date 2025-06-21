import os
import torch
from tqdm import tqdm
from transformers import AutoTokenizer, AutoModel

# Initialize the error log file
error_log_file = 'error_log_extract_features.txt'

# Function to load the model and tokenizer in a modular way
def load_model_and_tokenizer(model_name='dccuchile/bert-base-spanish-wwm-uncased'):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name, trust_remote_code=True, use_safetensors=True)
    return tokenizer, model

# Function to log errors to a file
def log_error(poem_path, error_message, log_file='error_log_extract_features.txt'):
    with open(log_file, 'a') as log:
        log.write(f"Error processing {poem_path}: {error_message}\n")

# Function to process poems and extract embeddings
def extract_embeddings_from_poems(input_folder, output_folder, tokenizer, model, layer=-1):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Clear the error log before starting
    with open(error_log_file, 'w') as log:
        log.write("Error Log for Extract Features Process:\n")
        
    # Iterate through the files in the prepared corpus folder
    for author in tqdm(os.listdir(input_folder), desc="Processing Authors"):
        author_folder = os.path.join(input_folder, author)
        if os.path.isdir(author_folder):
            output_author_folder = os.path.join(output_folder, author)
            if not os.path.exists(output_author_folder):
                os.makedirs(output_author_folder)

            for poem_file in os.listdir(author_folder):
                if poem_file.endswith('.txt'):
                    poem_name = poem_file.replace('.txt', '.pt')
                    output_poem_path = os.path.join(output_author_folder, poem_name)

                    # Check if the .pt file already exists
                    if os.path.exists(output_poem_path):
                        print(f"Skipping {output_poem_path}, already processed.")
                        continue  # Skip to the next file

                    poem_path = os.path.join(author_folder, poem_file)
                    try:
                        # Read the poem text
                        with open(poem_path, 'r', encoding='utf-8') as f:
                            poem_text = f.read()

                        # Tokenize and get embeddings
                        inputs = tokenizer(poem_text, return_tensors='pt', truncation=True, padding=True)
                        with torch.no_grad():
                            outputs = model(**inputs)

                        # Extract the embeddings from the selected layer (-1 for last hidden state)
                        embeddings = outputs.last_hidden_state[:, 0, :]  # [CLS] token embeddings

                        # Save the embeddings as .pt files
                        torch.save(embeddings, output_poem_path)

                    except Exception as e:
                        # Log the error if any exception occurs
                        log_error(poem_path, str(e))
                        print(f"Error processing {poem_path}. Logged the error.")



def main():
    # Define the input and output folders
    input_folder = 'corpus_prep'  # Folder with prepared poems
    output_folder = 'corpus_pt'   # Folder to save embeddings

    # Load the model and tokenizer (modular)
    model_name = 'dccuchile/bert-base-spanish-wwm-uncased'  # Model can be easily replaced
    tokenizer, model = load_model_and_tokenizer(model_name)

    # Process the poems and extract embeddings
    extract_embeddings_from_poems(input_folder, output_folder, tokenizer, model)

if __name__ == "__main__":
    main()
