# <img src="./readme_assets/ecopoetico-sinfondo-grande.png" alt="Homepage Screenshot" width="400"/>

This repository shares the code of [`EcoPoetico`](https://www.ecopoetico.cl) platform published in the article [`EcoPoetico: A Poetry Recommender System for Digital Literary Mediation`](https://doi.org/10.1007/978-3-031-93564-0_9)

## 🔗 Live Site

Visit the platform: [https://www.ecopoetico.cl](https://www.ecopoetico.cl)

## 📖 Who Mediates in a Digital Platform?

The growing use of digital platforms for reading raises questions about who fulfills the role of reading mediator. Educators and booksellers have traditionally provided the scaffolding for reading. In the digital space, however, this figure becomes blurred and indistinct.

`EcoPoetico` is a tool focused on the recommendation of poems. Through the use of Natural Language Processing, each poem allows for a journey toward others that are most similar in semantic content.

## 🚀 Setup Instructions

```bash
# clone the repo
git clone https://github.com/melanchthon19/ecopoetico.git
cd ecopoetico

# initialize virtual env
python -m venv venv
source venv/bin/activate

# install dependencies (django...)
pip install -r requirements.txt

# collect static
./build.sh -local

# django database schema
python manage.py migrate

# start the server
python manage.py runserver # access http://127.0.0.1:8000/
```

## Using Your Own Corpus

Follow the instructions in `ecopoetico/process_corpus/` in order to create recommendations using your own corpus.

The expected structure of your folder `corpus` inside `process_corpus` is:
```
.corpus/
├── author-1/
│   ├── title-poem-1.txt
│   └── title-poem-2.txt
├── author-2/
│   ├── title-poem-1.txt
│   └── title-poem-2.txt
├── author-3/
│   ├── title-poem-1.txt
│   └── title-poem-2.txt
```

Remember to adjust the model for feature extraction in the `main` function of the file `ecopoetico/process_corpus/extract_features.py`.

## 🙌 Citation

If you find this project useful, consider citing, starring the repository, and sharing!

Mora Melanchthon, D., Espallargas, L. (2025). EcoPoetico: A Poetry Recommender System for Digital Literary Mediation. In: Smith, B.K., Borge, M. (eds) Learning and Collaboration Technologies. HCII 2025. Lecture Notes in Computer Science, vol 15806. Springer, Cham. https://doi.org/10.1007/978-3-031-93564-0_9


### 📚 BibTeX

```bibtex
@InProceedings{10.1007/978-3-031-93564-0_9,
author="Mora Melanchthon, Daniel
and Espallargas, Loreto",
editor="Smith, Brian K.
and Borge, Marcela",
title="EcoPoetico: A Poetry Recommender System for Digital Literary Mediation",
booktitle="Learning and Collaboration Technologies",
year="2025",
publisher="Springer Nature Switzerland",
address="Cham",
pages="139--157",
isbn="978-3-031-93564-0"
}
```

## 📬 Chit-Chat
Feel free to open an issue if you have any questions, collaborative ideas, or just looking for Digital Literary Mediation chit-chat :)


