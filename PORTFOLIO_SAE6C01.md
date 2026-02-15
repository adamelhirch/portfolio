# S6C01 - Analyse de Données Yelp (Description hyper détaillée pour portfolio)

## Résumé exécutif

Dans le cadre de la SAE S6C01 (BUT Informatique), j'ai participé à la conception et à l'implémentation d'un projet complet d'analyse de données à grande échelle sur le dataset Yelp Academic. Le travail couvre tout le socle d'un pipeline data moderne: ingestion de données brutes JSONL, nettoyage structuré, transformation en Parquet, préparation NLP, représentation textuelle (TF-IDF, Word2Vec, embeddings documents), visualisation analytique via dashboards, et industrialisation partielle du code via une librairie Python réutilisable.

L'objectif principal était de transformer un dataset brut volumineux et hétérogène en une base exploitable pour l'analyse métier, puis de produire des analyses lisibles et argumentées autour de trois axes:
- les profils de reviewers,
- la performance des établissements,
- la sémantique des avis textuels.

Ce projet met en avant une forte composante Data Engineering + Data Analysis + NLP appliqué, avec une démarche rigoureuse de structuration du repo, de documentation, et de reproductibilité technique.

---

## Contexte académique et enjeux

- Formation: BUT Informatique, Semestre 6.
- Projet: SAE S6C01 - Analyse de Grandes Données.
- Jeu de données: Yelp Academic (business, reviews, users).
- Contraintes: volume élevé, données non versionnées sur Git, travail d'équipe, livrables notebook + documentation + visualisations.

Les enjeux techniques principaux étaient:
- standardiser des fichiers bruts JSONL de grande taille;
- garantir un nettoyage robuste sans casser la traçabilité;
- préparer les textes de reviews pour des usages NLP;
- produire des analyses compréhensibles pour un rendu académique;
- éviter un projet "notebooks isolés" en extrayant un noyau de fonctions réutilisables.

---

## Périmètre réellement implémenté

### 1) Ingestion et structuration des données

Le projet charge trois sources principales en brut:
- `data/raw/yelp_academic_dataset_business.json`
- `data/raw/yelp_academic_reviews4students.jsonl`
- `data/raw/yelp_academic_dataset_user4students.jsonl`

Puis convertit et persistifie les tables nettoyées en Parquet:
- `data/cleaned/business_clean.parquet`
- `data/cleaned/reviews_clean.parquet`
- `data/cleaned/users_clean.parquet`

La conversion vers Parquet est un choix structurant: meilleure compression, meilleure vitesse de lecture, meilleure compatibilité analytique avec pandas et pipelines ultérieurs.

### 2) Nettoyage de données (data quality)

Trois notebooks dédiés gèrent le nettoyage dataset par dataset:
- `notebooks/SAE-96_nettoyage_business.ipynb`
- `notebooks/SAE-97_nettoyage_reviews.ipynb`
- `notebooks/SAE-98_nettoyage_users.ipynb`

Actions de nettoyage implémentées (selon les tables):
- suppression des doublons clés (`business_id`, `review_id`, `user_id`),
- suppression des lignes sans identifiant essentiel,
- traitement des valeurs manquantes (imputation ou suppression selon criticité),
- validation de bornes métiers (ex. `stars` dans des intervalles cohérents),
- normalisation de champs textuels,
- conversion de dates en `datetime`,
- contrôles de cohérence finaux et export Parquet.

### 3) Préprocessing NLP

Le preprocessing est traité dans:
- `notebooks/SAE-70_nettoyage_texte_basique.ipynb`
- `notebooks/3-preprocessing/02-tokenization.ipynb`
- `notebooks/3-preprocessing/03-stopwords.ipynb`
- `notebooks/3-preprocessing/04-lemmatization.ipynb`
- `notebooks/3-preprocessing/05-pipeline.ipynb`

La logique inclut:
- nettoyage de texte (normalisation, suppression bruit, réduction espaces),
- tokenization,
- suppression de stopwords (avec possibilité d'exclusion pour conserver certaines négations),
- lemmatisation,
- pipeline paramétrable de preprocessing.

Le code est factorisé dans `src/text_preprocessing.py` pour limiter les duplications notebook et permettre la réutilisation.

### 4) Représentation textuelle

Deux approches principales sont implémentées:

1. TF-IDF
- `notebooks/4-text-representation/01-tfidf-demo.ipynb`
- `notebooks/SAE-95_dashboard_semantic.ipynb`
- `src/features.py` (fonction `compute_tfidf`)

Détail notable: prise en charge des n-grammes (ex. `ngram_range=(1,2)`) pour enrichir la représentation au-delà de l'unigramme.

2. Word2Vec + embeddings documents
- `notebooks/4-text-representation/03-word2vec-training.ipynb`
- `notebooks/4-text-representation/04-doc-embeddings.ipynb`
- modèle généré: `outputs/models/word2vec_yelp.model` (~4.6 MB)
- fonction utilitaire: `compute_doc_embeddings` dans `src/features.py`

Le principe retenu pour les embeddings documentaires est une moyenne des vecteurs de mots (approche simple, robuste et explicable pour un contexte académique).

### 5) Dashboards analytiques

Trois dashboards ciblent des questions métiers différentes:

- `notebooks/SAE-67_dashboard_reviewers.ipynb`
  - segmentation des reviewers,
  - sévérité moyenne des notes selon profil,
  - loquacité (longueur moyenne des avis),
  - relation expérience vs note moyenne.

- `notebooks/SAE-68_dashboard_performance.ipynb`
  - répartition des établissements par catégorie,
  - relation popularité (`review_count`) vs qualité (`stars`),
  - proxy d'engagement visuel (photos).

- `notebooks/SAE-95_dashboard_semantic.ipynb`
  - longueur d'avis selon la note,
  - répartition globale des sentiments (règle basée sur étoiles),
  - TF-IDF comparatif positif/négatif,
  - visualisation word clouds.

Artefacts générés (figures exportées):
- `outputs/figures/sae67_loquacity_by_profile.png`
- `outputs/figures/sae67_severity_by_profile.png`
- `outputs/figures/sae67_stars_vs_experience.png`
- `outputs/figures/sae68_impact_photos_proxy.png`
- `outputs/figures/sae68_popularite_vs_qualite.png`
- `outputs/figures/sae68_repartition_categories.png`
- `outputs/figures/sae95_length_vs_stars.png`
- `outputs/figures/sae95_satisfaction_pie.png`
- `outputs/figures/sae95_wordcloud_comparison.png`

---

## Architecture technique du repo

### Structure générale

- `notebooks/`: expérimentations et analyses interactives (17 notebooks).
- `src/`: fonctions mutualisées (5 modules Python principaux).
- `data/`: raw + cleaned (fichiers volumineux non versionnés).
- `outputs/`: modèles et figures exportées.
- `docs/`: workflows, plan projet, guides de setup/développement.

### Librairie interne `src/`

- `src/data_utils.py`
  - chargement Parquet sécurisé,
  - merge des datasets,
  - sampling reproductible.

- `src/text_preprocessing.py`
  - nettoyage de texte,
  - tokenization,
  - stopwords,
  - lemmatisation,
  - pipeline complet paramétrable.

- `src/features.py`
  - vectorisation TF-IDF,
  - embeddings documents via Word2Vec.

- `src/visualization.py`
  - utilitaires de style et sauvegarde,
  - fonctions de plots réutilisables.

- `src/__init__.py`
  - surface d'API interne simplifiée pour les notebooks.

Cette séparation notebook vs librairie réduit fortement le risque de duplication et améliore la maintenabilité.

---

## Environnement et stack

Dépendances principales (`requirements.txt`):
- Data: `pandas`, `numpy`, `pyarrow`.
- Visualisation: `matplotlib`, `seaborn`, `plotly`, `wordcloud`.
- NLP: `nltk`, `scikit-learn`, `gensim`.
- Deep/LLM installés dans l'environnement: `torch`, `transformers` (préparation du scope futur).
- Productivité: `jupyter`, `notebook`, `tqdm`.

Le projet inclut une documentation de setup détaillée (`docs/QUICKSTART.md`, `docs/WORKFLOW_SETUP.md`) facilitant l'onboarding d'un nouveau contributeur.

---

## Méthodologie de travail

Le projet est piloté avec une logique Agile via Linear (stories/epics), et une discipline Git/GitHub explicite:
- branches par story,
- commits structurés,
- PR de revue,
- documentation centralisée.

Des guides de workflow dédiés existent pour:
- setup environnement,
- développement,
- notebooks,
- pipeline data,
- intégration Linear ↔ GitHub.

Cette organisation montre un niveau de maturité supérieur à un simple projet de notebook isolé.

---

## Compétences démontrées (portfolio-ready)

### Data Engineering
- ingestion JSONL à grande volumétrie,
- nettoyage multi-table robuste,
- standardisation des schémas,
- export et exploitation Parquet,
- gestion des données lourdes hors Git.

### NLP appliqué
- pipeline de preprocessing configurable,
- vectorisation TF-IDF (incluant n-grammes),
- entraînement Word2Vec,
- génération d'embeddings documents.

### Data Analysis / BI
- design de dashboards orientés question métier,
- choix de visualisations adaptées,
- storytelling analytique (reviewers/performance/sémantique),
- production d'artefacts exportables pour soutenance.

### Software quality
- factorisation du code dans une librairie interne,
- documentation opérationnelle détaillée,
- structuration claire du repo,
- reproductibilité technique (venv + requirements + workflows).

### Gestion de projet
- découpage en epics/stories,
- coordination d'équipe,
- versioning collaboratif,
- traçabilité des livrables.

---

## Difficultés rencontrées et réponses techniques

1. Volume et hétérogénéité des données
- Réponse: séparation `raw`/`cleaned`, validations explicites, export colonne-oriented Parquet.

2. Risque de duplication de logique dans les notebooks
- Réponse: extraction d'un socle `src/` avec fonctions utilitaires réutilisables.

3. Besoin de lisibilité pour le rendu académique
- Réponse: dashboards thématiques + export de figures + structuration documentaire.

4. Maintenir l'extensibilité du projet
- Réponse: plan projet détaillé, dépendances ML/LLM déjà prêtes côté environnement.

---

## Limites actuelles (transparence portfolio)

Le socle data + NLP représentation est solide, mais certaines briques restent à finaliser pour un pipeline IA complet de bout en bout:
- entraînement et comparaison de modèles ML supervisés complets,
- intégration LLM appliquée au dataset,
- pipeline d'inférence final sur test set avec sélection de modèle optimal.

Ces points sont documentés dans le plan projet et constituent une roadmap claire d'évolution.

---

## Feuille de route recommandée (prochaine itération)

1. Implémenter un benchmark ML classique sur features texte:
- Logistic Regression,
- Linear SVM,
- Naive Bayes.

2. Comparer explicitement:
- CountVectorizer n-gram,
- TF-IDF,
- Word2Vec embeddings.

3. Ajouter un baseline LLM (HuggingFace) pour classification de sentiment.

4. Produire un notebook final d'inférence:
- choix du meilleur modèle,
- évaluation test set,
- export prédictions,
- synthèse comparative.

---

## Version courte (à coller sur CV / LinkedIn)

Projet Data/NLP sur le dataset Yelp Academic: ingestion JSONL, nettoyage de données multi-tables, conversion Parquet, preprocessing NLP (tokenization/stopwords/lemmatisation), représentation textuelle (TF-IDF avec n-grammes, Word2Vec, embeddings documents), et création de dashboards analytiques (reviewers, performance établissements, sémantique). Industrialisation partielle via librairie Python réutilisable (`src/`) et documentation technique complète (workflows setup/dev/data pipeline). Livrables: 17 notebooks, 5 modules Python, 9 visualisations exportées, 1 modèle Word2Vec entraîné.

---

## Références de fichiers clés

- Vue projet: `README.md`
- Plan d'exécution: `docs/PROJECT-PLAN.md`
- Nettoyage: `notebooks/SAE-96_nettoyage_business.ipynb`, `notebooks/SAE-97_nettoyage_reviews.ipynb`, `notebooks/SAE-98_nettoyage_users.ipynb`
- NLP pipeline: `src/text_preprocessing.py`, `notebooks/3-preprocessing/05-pipeline.ipynb`
- Représentation texte: `src/features.py`, `notebooks/4-text-representation/01-tfidf-demo.ipynb`, `notebooks/4-text-representation/03-word2vec-training.ipynb`, `notebooks/4-text-representation/04-doc-embeddings.ipynb`
- Dashboards: `notebooks/SAE-67_dashboard_reviewers.ipynb`, `notebooks/SAE-68_dashboard_performance.ipynb`, `notebooks/SAE-95_dashboard_semantic.ipynb`
- Artefacts: `outputs/figures/`, `outputs/models/word2vec_yelp.model`
