# 📊 Analyse de Données Massives - Yelp Dataset

**Projet Académique (BUT Informatique S6)** | *Data Science, NLP & Machine Learning*

---

## 💡 Présentation du Projet

Ce projet vise à explorer et analyser le **Yelp Academic Dataset**, un ensemble de données volumineux contenant des millions d'avis, de commerces et d'utilisateurs. L'objectif principal est d'extraire des insights pertinents et de développer des modèles prédictifs pour comprendre les interactions entre clients et entreprises.

Le projet met en œuvre un pipeline de données complet, allant du nettoyage de données brutes (JSON) à l'entraînement de modèles de Machine Learning et de Deep Learning (NLP), en passant par une analyse exploratoire approfondie.

## 🛠️ Stack Technique

*   **Langage & Environnement**: Python 3.12+, Jupyter Notebooks
*   **Data Engineering**: `Pandas` (Manipulation), `Numpy`, `Parquet` (Stockage optimisé)
*   **NLP (Traitement du Langage Naturel)**:
    *   `NLTK`, `Spacy` (Nettoyage, Tokenization)
    *   `Scikit-learn` (TF-IDF)
    *   `Gensim` (Word2Vec - Word Embeddings)
    *   `Transformers` (HuggingFace - LLMs comme BERT)
*   **Machine Learning**: `Scikit-learn` (Classification, Clustering), `PyTorch`
*   **Visualisation**: `Matplotlib`, `Seaborn`, `Plotly` (Graphiques interactifs)
*   **Version Control & Gestion**: Git/GitHub, Linear (Agile), VS Code

## 🚀 Fonctionnalités Clés & Réalisations

### 1. Pipeline de Données & Optimisation
*   Traitement de datasets volumineux (~6 Go de JSON brut) avec conversion vers le format **Parquet** pour optimiser les temps de chargement et l'empreinte mémoire.
*   Gestion efficace des types de données et nettoyage robuste (gestion des valeurs manquantes, détection d'anomalies).

### 2. Analyse Exploratoire de Données (EDA)
*   Analyses statistiques de la distribution des notes, des longueurs d'avis et de l'activité des utilisateurs.
*   Visualisations géospatiales de la répartition des commerces.
*   Étude des corrélations entre les attributs des commerces et leur popularité.

### 3. NLP & Feature Engineering
*   **Prétraitement Textuel**: Pipeline de nettoyage incluant la suppression des stopwords, la lemmatisation et la normalisation.
*   **Représentation Vectorielle**:
    *   Implémentation de **TF-IDF** (avec optimisation des **N-grammes**) pour identifier les termes significatifs.
    *   Entraînement de modèles **Word2Vec** pour capturer le contexte sématique des mots.
    *   Utilisation d'**Embeddings** de documents et de LLMs.

### 4. Modélisation & Inférence (Stratégie Évaluation)
*   **Approche Hybride**: Comparaison systématique entre :
    *   **ML Classique**: Régression Logistique, SVM, Random Forest (sur N-grams & TF-IDF).
    *   **Deep Learning**: Architectures neuronales avancées (PyTorch) et Fine-tuning de LLMs (BERT).
*   **Pipeline d'Inférence**: Système robuste conçu pour **prédire sur de nouvelles données de test** (capacité de généralisation vérifiée).
*   **Comparaison Modèle Optimal**: Sélection du meilleur modèle (Classique vs Deep) basé sur les métriques de performance sur données invisibles.
*   **A venir**:
    *   Clustering K-Means et visualisation t-SNE.
    *   Système de recommandation.

### 5. DevOps & Automation
*   **Intégration Continue (CI/CD)**: Configuration complète de l'environnement avec `venv` et gestion des dépendances.
*   **Linear ↔ GitHub**: Mise en place d'une synchronisation bidirectionnelle. Les commits et PRs mettent automatiquement à jour le statut des tickets Linear.
*   **Documentation Automatisée**: Génération de documentation technique et contextuelle pour les assistants IA.

## 👨‍💻 Méthodologie

*   **Agile**: Organisation en sprints avec suivi des tâches sur Linear.
*   **Code Quality**: Respect des standards Python (PEP8), documentation des fonctions, et architecture modulaire (`src/` pour le code réutilisable).
*   **Collaboration**: Workflow Git strict avec Pull Requests et Code Reviews.

## 📂 Structure du Répertoire

```bash
├── data/          # Données brutes et nettoyées (Parquet)
├── notebooks/     # Analyses expérimentales et visualisations (Jupyter)
├── src/           # Modules Python (ETL, NLP, Viz)
├── outputs/       # Rapports générés et graphiques
└── docs/          # Documentation technique et guides
```

---
*Ce projet a été réalisé dans le cadre du semestre 6 du BUT Informatique, en équipe de 5 étudiants.*
