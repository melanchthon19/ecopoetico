#!/bin/bash

# Function to check if a file exists and has content
check_file_exists() {
  if [ -f "$1" ] && [ -s "$1" ]; then
    echo "File '$1' exists and contains content."
  else
    echo "Error: File '$1' does not exist or is empty."
    exit 1
  fi
}

# Function to check if a folder exists and has content
check_folder_exists() {
  if [ -d "$1" ] && [ "$(ls -A $1)" ]; then
    echo "Folder '$1' exists and contains files."
  else
    echo "Error: Folder '$1' does not exist or is empty."
    exit 1
  fi
}

# Function to run a Python script and check for errors
run_script() {
  echo "Running $1..."
  python3 "$1"
  if [ $? -ne 0 ]; then
    echo "Error running $1"
    exit 1
  fi
  echo "$1 completed successfully."
}

# Function to create a directory if it doesn't exist
create_folder_if_not_exists() {
  if [ ! -d "$1" ]; then
    echo "Creating folder '$1'..."
    mkdir -p "$1"
  fi
}

# Main pipeline execution
echo "Starting pipeline..."

# Step 1: Run preprocess.py
run_script "preprocess.py"

# Step 2: Run extract_features.py
run_script "extract_features.py"

# Step 3: Run extract_keywords.py
run_script "extract_keywords.py"

# Step 4: Run compute_similarity.py
run_script "compute_similarity.py"

# Step 5: Verify output files and folders
echo "Verifying outputs..."

# Verify corpus_prep folder
check_folder_exists "corpus_prep"

# Verify corpus_pt folder
check_folder_exists "corpus_pt"

# Verify keywords CSV
check_file_exists "keywords_tfidf_by_author.csv"

# Verify similarity matrix CSV
check_file_exists "similarity_matrix.csv"

# Verify mapping from original to formatted titles
check_file_exists "original_to_formatted_titles.csv"

# Step 6: Create the 'similarity' and 'logs' folders if they don't exist
create_folder_if_not_exists "similarity"
create_folder_if_not_exists "logs"

# Step 7: Move CSV files to the 'similarity' folder
echo "Moving CSV files to the 'similarity' folder..."
mv "keywords_tfidf_by_author.csv" "similarity/"
mv "similarity_matrix.csv" "similarity/"
mv "original_to_formatted_titles.csv" "similarity/"

# Step 8: Move log files to the 'logs' folder
echo "Moving log files to the 'logs' folder..."
mv *.txt "logs/"

echo "Pipeline completed successfully!"
