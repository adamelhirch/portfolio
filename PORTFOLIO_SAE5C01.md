# 🎬 SAÉ 5C01 — Moteur de Recherche & Recommandation de Séries TV

> **Projet universitaire** — BUT Informatique, Semestre 5  
> **Type** : Application web full-stack  
> **Durée** : Décembre 2025 – Février 2026  

---

## 📋 Sommaire

1. [Présentation du projet](#-présentation-du-projet)
2. [Stack technique](#-stack-technique)
3. [Architecture globale](#-architecture-globale)
4. [Backend — API REST Flask](#-backend--api-rest-flask)
5. [Pipeline ETL — Traitement des données](#-pipeline-etl--traitement-des-données)
6. [Base de données — PostgreSQL](#-base-de-données--postgresql)
7. [Moteur de recherche — BM25](#-moteur-de-recherche--bm25)
8. [Système de recommandations](#-système-de-recommandations)
9. [Frontend — Interface React](#-frontend--interface-react)
10. [Authentification & Sécurité](#-authentification--sécurité)
11. [Tests & Qualité — Postman](#-tests--qualité--postman)
12. [DevOps & Scripting](#-devops--scripting)
13. [Compétences développées](#-compétences-développées)

---

## 🎯 Présentation du projet

### Objectif

Concevoir et développer un **moteur de recherche de séries TV** basé sur l'analyse de sous-titres, capable de :

- **Rechercher** des séries par le contenu de leurs dialogues (recherche sémantique full-text)
- **Recommander** des séries similaires grâce à un algorithme de content-based filtering
- **Personnaliser** l'expérience utilisateur avec un système de notation et de favoris
- **Enrichir automatiquement** les métadonnées via l'IA (Mistral) et l'API TMDB

### Concept

L'idée originale est d'exploiter les **sous-titres** des séries comme source de données textuelles. Plutôt que de se baser sur des tags ou des descriptions manuelles, le moteur de recherche indexe le contenu réel des dialogues pour permettre une recherche par mots-clés pertinents. Par exemple, un utilisateur peut chercher *"meth blue chemistry"* et retrouver **Breaking Bad**, ou *"dragons throne kingdom"* et obtenir **Game of Thrones**.

### Fonctionnalités clés

| Fonctionnalité | Description |
|---|---|
| 🔍 Recherche BM25 | Recherche full-text dans les dialogues de sous-titres avec scoring de pertinence |
| 🔤 Recherche par titre | Recherche fuzzy utilisant les index trigram de PostgreSQL |
| 🤖 Recommandations | Algorithme TF-IDF + cosine similarity pour les séries similaires |
| ⭐ Notation | Système de notes 1-5 étoiles par utilisateur |
| 📑 Favoris / Watchlist | Liste personnelle de séries sauvegardées |
| 🎛️ Filtres avancés | Filtrage par genre, plateforme, année, note minimale |
| 📤 Upload admin | Upload de fichiers ZIP de sous-titres avec pipeline ETL automatique |
| 🧠 Enrichissement IA | Identification automatique du titre via Mistral AI + récupération TMDB |
| 👤 Profil utilisateur | Statistiques personnelles, genres favoris, historique des notes |
| 🛡️ Admin panel | Gestion CRUD complète des séries et des utilisateurs |

---

## 🛠 Stack technique

### Backend

| Technologie | Rôle |
|---|---|
| **Python 3** | Langage serveur |
| **Flask** | Framework web (API REST) |
| **Flask-JWT-Extended** | Authentification JWT |
| **Flask-CORS** | Gestion Cross-Origin |
| **psycopg2** | Driver PostgreSQL |
| **rank-bm25** | Algorithme de ranking BM25 Okapi |
| **scikit-learn** | TF-IDF vectorization + cosine similarity |
| **NLTK** | Traitement du langage naturel |
| **Werkzeug** | Hashage sécurisé des mots de passe |

### Intelligence Artificielle & APIs externes

| Technologie | Rôle |
|---|---|
| **Mistral AI** | Prédiction du titre de série à partir du nom de dossier |
| **OpenAI** (fallback) | Alternative à Mistral pour le title mapping |
| **TMDB API** | Métadonnées : affiches, synopsis, casting, genres, plateformes |
| **sentence-transformers** | Embeddings pour la similarité sémantique |
| **torch** | Backend PyTorch pour les modèles de ML |

### Frontend

| Technologie | Rôle |
|---|---|
| **React 18** | Bibliothèque UI |
| **Vite** | Bundler et dev server (build ultra-rapide) |
| **React Router DOM 6** | Routage SPA |
| **Axios** | Client HTTP avec interceptors |
| **CSS3 natif** | Styling sans framework (custom design system) |

### Base de données

| Technologie | Rôle |
|---|---|
| **PostgreSQL** | SGBD relationnel principal |
| **pg_trgm** | Extension pour recherche trigram (fuzzy search) |
| **unaccent** | Extension pour normalisation sans accents |

### Outils de développement

| Outil | Rôle |
|---|---|
| **Postman** | Tests d'API automatisés (collection complète) |
| **dotenv** | Gestion des variables d'environnement |
| **chardet** | Détection automatique d'encodage de fichiers |
| **stopwordsiso** | Listes de stopwords multilingues (FR + EN) |

---

## 🏗 Architecture globale

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEUR (Navigateur)              │
│                     React 18 + Vite                     │
│              http://localhost:5173                       │
└──────────────────────────┬──────────────────────────────┘
                           │  Axios (JWT Bearer Token)
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  API REST — Flask                        │
│               http://localhost:5001                      │
│                                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  Auth BP │ │ Series BP│ │ Users BP │ │ Filters BP│  │
│  │ /api/auth│ │/api/serie│ │/api/users│ │/api/filter│  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│  ┌──────────┐ ┌──────────────────────────────────────┐  │
│  │ Admin BP │ │        BM25 Service (In-Memory)      │  │
│  │/api/admin│ │  Index chargé au démarrage du serveur│  │
│  └──────────┘ └──────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │  psycopg2
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL (port 5434)                 │
│                                                         │
│   series │ subtitles │ bm25_data │ users │ ratings     │
│   series_saved │ search_logs │ recommendations         │
│   series_genres │ series_people │ series_platforms      │
│   user_recommendations                                  │
└──────────────────────────┬──────────────────────────────┘
                           ▲
┌──────────────────────────┴──────────────────────────────┐
│               PIPELINE ETL (7 étapes)                   │
│                                                         │
│   00. Reset DB → 01. Unzip → 02. Insert Subtitles      │
│   03. Build BM25 Index → 04. Build Recommendations     │
│   05. Fetch TMDB Metadata (via Mistral AI)              │
│   06. Enrich Details (Cast, Genres, Platforms)           │
│                                                         │
│              Mistral AI ←→ TMDB API                     │
└─────────────────────────────────────────────────────────┘
```

### Structure du projet

```
SAE5C01/
├── app/                        # Backend Flask
│   ├── __init__.py             # Factory pattern (create_app)
│   ├── bm25.py                 # Service BM25 (singleton, in-memory)
│   ├── db.py                   # Connexion PostgreSQL
│   ├── routes/                 # Blueprints Flask
│   │   ├── auth.py             #   Authentification (register, login, me)
│   │   ├── series.py           #   Séries (search, details, rate, save, recommendations)
│   │   ├── users.py            #   Utilisateurs (CRUD, stats, saved)
│   │   ├── admin.py            #   Administration (upload, delete, update)
│   │   └── filters.py          #   Filtres (genres, platforms, multi-criteria)
│   └── services/
│       └── etl_service.py      # Service ETL embarqué (pipeline on-demand)
│
├── etl/                        # Pipeline de traitement des données
│   ├── config.py               # Configuration (DB, API keys, .env)
│   ├── lib_ingest.py           # Bibliothèque d'ingestion (unzip, parse SRT, clean)
│   ├── lib_metadata.py         # Bibliothèque de métadonnées (Mistral, TMDB, keywords)
│   ├── 00_reset_database.py    # Réinitialisation du schéma
│   ├── 01_unzip_subtitles.py   # Décompression récursive des archives
│   ├── 02_insert_subtitles.py  # Parsing SRT + nettoyage NLP + insertion BD
│   ├── 03_build_bm25_index.py  # Tokenisation + construction index BM25
│   ├── 04_build_recommendations.py  # TF-IDF + cosine similarity → recommandations
│   ├── 05_fetch_tmdb_metadata.py    # Mistral AI title prediction → TMDB search
│   └── 06_enrich_tmdb_details.py    # Casting, genres, plateformes depuis TMDB
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/         # Header, SeriesCard, SeriesModal
│   │   ├── pages/              # Home, Browse, Login, Register, Profile, Admin, ...
│   │   ├── contexts/           # AuthContext (état global)
│   │   ├── services/           # api.js (couche HTTP centralisée)
│   │   ├── App.jsx             # Routing principal + guards
│   │   └── index.css           # Design system global
│   ├── vite.config.js
│   └── package.json
│
├── schema.sql                  # Schéma PostgreSQL complet (11 tables)
├── requirements.txt            # Dépendances Python (75 packages)
├── run_pipeline.py             # Orchestrateur de la pipeline ETL
├── api_entry.py                # Point d'entrée de l'API
├── start.sh / stop.sh          # Scripts de démarrage/arrêt
├── postman_collection.json     # Collection Postman (28 endpoints testés)
└── sous-titres/                # Répertoire des données (15 000+ fichiers SRT)
```

---

## 🔌 Backend — API REST Flask

### Architecture

Le backend suit le pattern **Application Factory** de Flask avec une organisation en **Blueprints** modulaires :

```python
# app/__init__.py
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})
    jwt = JWTManager(app)
    
    # 5 Blueprints modulaires
    app.register_blueprint(series_bp,  url_prefix='/api/series')
    app.register_blueprint(auth_bp,    url_prefix='/api/auth')
    app.register_blueprint(users_bp,   url_prefix='/api/users')
    app.register_blueprint(admin_bp,   url_prefix='/api/admin')
    app.register_blueprint(filters_bp, url_prefix='/api/filters')
    
    # Chargement de l'index BM25 en mémoire au démarrage
    BM25Service.get_instance().load_index()
    
    return app
```

### Les 28 Endpoints de l'API

#### Authentification (`/api/auth`) — 3 endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Inscription d'un utilisateur | ❌ |
| `POST` | `/api/auth/login` | Connexion (retourne JWT + user) | ❌ |
| `GET` | `/api/auth/me` | Profil de l'utilisateur connecté | 🔒 JWT |

#### Séries (`/api/series`) — 11 endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/series/search?q=...&mode=content\|title` | Recherche BM25 ou fuzzy | ❌ |
| `GET` | `/api/series/recommendations` | Recommandations personnalisées ou top global | Optionnel |
| `GET` | `/api/series/` | Liste paginée de toutes les séries | ❌ |
| `GET` | `/api/series/<id>` | Détails complets (+ user_rating, is_saved) | Optionnel |
| `GET` | `/api/series/<id>/recommendations` | Séries similaires par contenu | ❌ |
| `POST` | `/api/series/<id>/rate` | Noter une série (1 à 5) | 🔒 JWT |
| `DELETE` | `/api/series/<id>/rate` | Supprimer sa note | 🔒 JWT |
| `POST` | `/api/series/<id>/save` | Ajouter aux favoris | 🔒 JWT |
| `DELETE` | `/api/series/<id>/unsave` | Retirer des favoris | 🔒 JWT |
| `GET` | `/api/series/saved` | Liste des séries sauvegardées | 🔒 JWT |
| `GET` | `/api/series/rated` | Liste des séries notées | 🔒 JWT |

#### Utilisateurs (`/api/users`) — 7 endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/users/` | Liste tous les utilisateurs | 🔒 Admin |
| `GET` | `/api/users/<id>` | Détails d'un utilisateur | 🔒 Self/Admin |
| `PUT` | `/api/users/<id>` | Modifier un utilisateur | 🔒 Self/Admin |
| `DELETE` | `/api/users/<id>` | Supprimer un utilisateur | 🔒 Self/Admin |
| `GET` | `/api/users/saved` | Séries sauvegardées (avec metadata) | 🔒 JWT |
| `GET` | `/api/users/stats` | Statistiques : genres favoris, notes, compteurs | 🔒 JWT |

#### Filtres (`/api/filters`) — 3 endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/filters/genres` | Liste des genres avec compteurs | ❌ |
| `GET` | `/api/filters/platforms` | Liste des plateformes avec compteurs | ❌ |
| `GET` | `/api/filters/series` | Filtrage multi-critères (genres, plateformes, années, note) | ❌ |

#### Administration (`/api/admin`) — 4 endpoints

| Méthode | Route | Description | Auth |
|---|---|---|---|
| `POST` | `/api/admin/upload` | Upload ZIP → pipeline ETL automatique | 🔒 Admin |
| `POST` | `/api/admin/series/<id>/upload` | Enrichir une série avec de nouveaux sous-titres | 🔒 Admin |
| `PUT` | `/api/admin/series/<id>` | Modifier les métadonnées manuellement | 🔒 Admin |
| `DELETE` | `/api/admin/series/<id>` | Supprimer une série (DB + fichiers) | 🔒 Admin |

---

## ⚙️ Pipeline ETL — Traitement des données

La pipeline ETL est le cœur du traitement des données. Elle transforme des fichiers ZIP de sous-titres bruts en données structurées, indexées et enrichies.

### Vue d'ensemble de la pipeline

```
 ZIP de sous-titres (.srt)
         │
         ▼
┌─────────────────────┐
│ 00. Reset Database  │  Réinitialise le schéma PostgreSQL
└────────┬────────────┘
         ▼
┌─────────────────────┐
│ 01. Unzip Subtitles │  Décompression récursive (ZIP imbriqués)
└────────┬────────────┘  Remontée des .srt à la racine
         ▼
┌─────────────────────┐
│ 02. Insert Subtitles│  Parse SRT → extraction texte brut
└────────┬────────────┘  Nettoyage NLP (HTML, timestamps, URLs)
         │               Suppression stopwords (FR + EN)
         ▼               Insertion en BD (series + subtitles)
┌─────────────────────┐
│ 03. Build BM25 Index│  Tokenisation des textes nettoyés
└────────┬────────────┘  Normalisation Unicode (accents)
         │               Stockage tokens + métadonnées en BD
         ▼
┌─────────────────────┐
│ 04. Build Recos     │  Vectorisation TF-IDF (scikit-learn)
└────────┬────────────┘  Calcul cosine similarity entre séries
         │               Top 10 recommandations par série
         ▼
┌─────────────────────┐
│ 05. Fetch Metadata  │  Nom de dossier → Mistral AI → Titre propre
└────────┬────────────┘  Titre → TMDB Search → TMDB ID
         │               Validation par keywords cross-check
         ▼               Synopsis, affiche, année, note TMDB
┌─────────────────────┐
│ 06. Enrich Details  │  TMDB ID → Credits → Acteurs, Réalisateurs
└─────────────────────┘  TMDB ID → Genres → Drama, Sci-Fi, etc.
                         TMDB ID → Providers → Netflix, Prime Video, etc.
```

### Détail des étapes

#### Étape 00 — Reset Database (`00_reset_database.py`)
Exécute le fichier `schema.sql` pour recréer toutes les tables et les index PostgreSQL.

#### Étape 01 — Unzip Subtitles (`01_unzip_subtitles.py`)
- Parcourt le répertoire `sous-titres/` contenant les archives
- Décompression récursive (gestion des ZIP imbriqués)
- Remontée automatique de tous les fichiers `.srt` à la racine du dossier de la série
- Suppression des archives et dossiers vides après extraction

#### Étape 02 — Insert Subtitles (`02_insert_subtitles.py`)
- **Parsing SRT** : Détection automatique de l'encodage (chardet) + extraction du texte brut
- **Nettoyage NLP** : 
  - Suppression des balises HTML/XML
  - Suppression des timestamps SRT
  - Suppression des URLs et coordonnées
  - Suppression des stopwords multilingues (FR + EN via stopwordsiso)
  - Normalisation Unicode (suppression des accents)
  - Nettoyage des caractères spéciaux et des dialogues techniques
- **Insertion BD** : Création de la série + insertion du texte brut et nettoyé

#### Étape 03 — Build BM25 Index (`03_build_bm25_index.py`)
- Tokenisation du texte nettoyé pour chaque série
- Suppression des tokens trop courts (< 3 caractères)
- Normalisation Unicode complète
- Stockage dans la table `bm25_data` : tokens, count, doc_index

#### Étape 04 — Build Recommendations (`04_build_recommendations.py`)
- **Vectorisation TF-IDF** : Chaque série est représentée comme un vecteur TF-IDF basé sur ses sous-titres nettoyés
- **Cosine Similarity** : Calcul de la matrice de similarité entre toutes les séries
- **Top 10** : Pour chaque série, les 10 séries les plus similaires sont stockées dans la table `recommendations` avec leur score
- **Résultat** : ~779 paires de recommandations générées

#### Étape 05 — Fetch TMDB Metadata (`05_fetch_tmdb_metadata.py`)
Pipeline d'identification et d'enrichissement en 3 étapes :

1. **Extraction de keywords** : Mots les plus fréquents des sous-titres (hors stopwords)
2. **Prédiction du titre via IA** :
   - Le nom de dossier brut (ex: `Breaking.Bad.S01.720p.BluRay`) est envoyé à **Mistral AI**
   - Mistral extrait le titre propre de la série (ex: `Breaking Bad`)
   - Fallback vers nettoyage regex si l'IA échoue
3. **Recherche TMDB** :
   - Le titre prédit est cherché sur l'API TMDB
   - Validation croisée via les keywords (local vs. TMDB) pour s'assurer de la bonne correspondance
   - Récupération : synopsis, affiche, année, note TMDB

#### Étape 06 — Enrich Details (`06_enrich_tmdb_details.py`)
Pour chaque série ayant un `tmdb_id`, récupère depuis TMDB :
- **Casting** : Acteurs, réalisateurs, producteurs → table `series_people`
- **Genres** : Drama, Comedy, Sci-Fi, etc. → table `series_genres`
- **Plateformes** : Netflix, Prime Video, Disney+, etc. → table `series_platforms`

### Bibliothèques partagées

#### `lib_ingest.py` — Ingestion des données
- `unzip_series()` : Décompression récursive
- `extract_text_content()` : Parsing SRT/SUB avec détection d'encodage
- `clean_text_content()` : Pipeline de nettoyage NLP complète
- `insert_series_db()` / `insert_subtitles_db()` : Insertion en base
- `process_series_files_recursive()` : Traitement récursif des fichiers
- `append_subtitles_from_zip()` : Enrichissement incrémental d'une série

#### `lib_metadata.py` — Métadonnées et IA
- `get_top_keywords()` : Extraction des mots-clés les plus fréquents depuis les sous-titres
- `fetch_tmdb_keywords()` : Récupération des tags TMDB (EN + FR) pour validation
- `check_keyword_similarity()` : Score de correspondance local vs. TMDB (0-1)
- `search_tmdb_candidates()` / `fetch_tmdb_data()` : Recherche et récupération TMDB
- `format_folder_name_mistral()` : Prédiction du titre via Mistral AI
- `format_folder_name_openai()` : Alternative via OpenAI (fallback)
- `format_folder_name_regex()` : Nettoyage par expressions régulières (fallback ultime)

### ETL Service embarqué (`etl_service.py`)

Le module `ETLService` est une version embarquée de la pipeline, utilisée par l'API admin pour traiter les uploads en temps réel :

```python
class ETLService:
    @staticmethod
    def process_series_zip(zip_path, original_filename, series_name=None):
        """
        Pipeline complète :
        1. Ingest (Unzip, Parse SRT, Insert DB)
        2. Enrich (Mistral AI → TMDB Metadata → Genres)
        3. Index (Update BM25 + Recommandations)
        """
    
    @staticmethod
    def enrich_series_subtitles(series_id, zip_path):
        """Enrichissement incrémental d'une série existante"""
```

---

## 🗄 Base de données — PostgreSQL

### Schéma relationnel — 11 Tables

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│    users     │     │   series     │     │    subtitles      │
│──────────────│     │──────────────│     │──────────────────│
│ id (PK)      │     │ id (PK)      │────▶│ series_id (FK,UQ)│
│ username (UQ)│     │ title (UQ)   │     │ text_raw         │
│ email (UQ)   │     │ tmdb_title   │     │ text_clean       │
│ password_hash│     │ affiche      │     └──────────────────┘
│ first_name   │     │ synopsis     │
│ last_name    │     │ year         │     ┌──────────────────┐
│ is_admin     │     │ rating_avg   │     │    bm25_data     │
│ created_at   │     │ tmdb_id (UQ) │────▶│ series_id (FK,UQ)│
│ updated_at   │     │ created_at   │     │ tokens[]         │
└──────┬───────┘     │ updated_at   │     │ token_count      │
       │             └──────┬───────┘     │ doc_index        │
       │                    │             └──────────────────┘
       │   ┌────────────────┤
       │   │                │            ┌───────────────────┐
       │   │   ┌────────────┤            │ series_genres     │
       │   │   │            │───────────▶│ series_id (FK)    │
       ▼   ▼   │            │            │ genre             │
┌──────────────┐│            │            └───────────────────┘
│   ratings    ││            │
│──────────────││            │            ┌───────────────────┐
│ user_id (FK) ││            │───────────▶│ series_people     │
│ series_id(FK)││            │            │ series_id (FK)    │
│ rating (1-5) ││            │            │ person_name       │
│ (UQ: u+s)   ││            │            │ person_role       │
└──────────────┘│            │            └───────────────────┘
                │            │
┌──────────────┐│            │            ┌───────────────────┐
│ series_saved ││            │───────────▶│ series_platforms   │
│──────────────││            │            │ series_id (FK)    │
│ user_id (FK) ││                         │ provider_name     │
│ series_id(FK)││                         └───────────────────┘
│ (UQ: u+s)   ││
└──────────────┘│         ┌───────────────────────┐
                │         │   recommendations     │
┌──────────────┐│         │───────────────────────│
│ search_logs  ││         │ base_series_id (FK)   │
│──────────────││         │ recommended_series_id  │
│ user_id (FK) ││         │ similarity_score      │
│ query        ││         │ (UQ: base + reco)     │
│ result_count ││         └───────────────────────┘
│ latency_ms   ││
│ results(JSON)││         ┌───────────────────────┐
│ session_id   │└────────▶│ user_recommendations  │
└──────────────┘          │ user_id (FK)          │
                          │ series_id (FK)        │
                          │ score                 │
                          └───────────────────────┘
```

### Extensions PostgreSQL utilisées

- **`pg_trgm`** : Index trigram pour la recherche fuzzy par titre (GIN index)
- **`unaccent`** : Normalisation des caractères accentués dans les requêtes

### Index optimisés

Le schéma inclut **17 index** pour optimiser les performances :
- Index GIN trigram sur `series.title` pour la recherche fuzzy
- Index B-tree sur toutes les clés étrangères
- Index sur `recommendations.similarity_score DESC` pour le tri
- Index sur `search_logs.timestamp` pour l'historique
- Index sur `series.year` et `series.tmdb_id` pour le filtrage

---

## 🔍 Moteur de recherche — BM25

### Algorithme BM25 Okapi

Le cœur du moteur de recherche est l'algorithme **BM25 Okapi**, un algorithme de ranking reconnu en recherche d'information :

```python
class BM25Service:
    """Service singleton — index chargé en mémoire au démarrage"""
    
    def load_index(self):
        # Charge les tokens depuis PostgreSQL
        # Normalise les accents
        # Construit l'index BM25Okapi en mémoire
    
    def search(self, query):
        # Tokenise la requête
        # Calcule les scores BM25 pour chaque document
        # Retourne les indices triés par pertinence
```

### Fonctionnement

1. **Indexation** : Les sous-titres nettoyés sont tokenisés et stockés dans `bm25_data`
2. **Chargement** : Au démarrage du serveur, l'index est construit en mémoire (singleton)
3. **Recherche** : La requête utilisateur est tokenisée, normalisée, puis scorée contre l'index
4. **Résultats** : Les séries sont retournées triées par score de pertinence décroissant

### Double mode de recherche

| Mode | Description | Méthode |
|---|---|---|
| `content` | Recherche dans les dialogues des sous-titres | BM25 sur les tokens du texte nettoyé |
| `title` | Recherche fuzzy dans les titres | SQL trigram similarity (`pg_trgm`) |

---

## 🤖 Système de recommandations

### Content-Based Filtering

Le système de recommandations utilise le **filtrage basé sur le contenu** :

1. **Vectorisation TF-IDF** : Chaque série est transformée en un vecteur TF-IDF à partir de ses sous-titres
2. **Cosine Similarity** : La similarité entre chaque paire de séries est calculée
3. **Top 10** : Les 10 séries les plus similaires sont stockées pour chaque série

### Recommandations personnalisées

Quand un utilisateur est connecté et a noté des séries :

1. Le système identifie les séries aimées (note ≥ 4)
2. Pour chaque série aimée, il récupère les séries similaires depuis la table `recommendations`
3. Les séries déjà notées sont exclues
4. Le résultat est trié par score de similarité moyen

### Fallback intelligent

| Situation | Comportement |
|---|---|
| Utilisateur connecté avec notes ≥ 4 | Recommandations personnalisées basées sur les goûts |
| Utilisateur connecté sans notes ≥ 4 | Top 12 global (meilleures notes moyennes) |
| Utilisateur non connecté | Top 12 global |

### Données chiffrées

- **~779 paires** de recommandations générées
- **Top 10** séries similaires par série
- **Score de similarité** entre 0 et 1

---

## 🎨 Frontend — Interface React

### Design System

L'interface est inspirée de **Netflix** avec une identité visuelle unique **violet et noir** :

```css
/* Palette de couleurs */
--primary-violet:       #8b5cf6    /* Violet principal */
--primary-violet-dark:  #7c3aed    /* Violet foncé (hover) */
--primary-violet-light: #a78bfa    /* Violet clair (accents) */
--secondary-purple:     #6d28d9    /* Violet secondaire */
--background-black:     #0a0a0a    /* Noir principal */
--background-dark:      #141414    /* Noir des cards */
--background-card:      #1a1a1a    /* Fond des cartes */
```

### Pages de l'application

| Page | Route | Description | Accès |
|---|---|---|---|
| **Home** | `/` | Landing page avec barre de recherche centrée + recommandations | Public |
| **Browse** | `/browse` | Exploration de toutes les séries avec pagination | Public |
| **Login** | `/login` | Page de connexion | Public |
| **Register** | `/register` | Page d'inscription | Public |
| **Profile** | `/profile` | Profil utilisateur avec stats et édition | 🔒 Authentifié |
| **Saved Series** | `/saved` | Watchlist / séries sauvegardées | 🔒 Authentifié |
| **Rated Series** | `/rated` | Séries notées par l'utilisateur | 🔒 Authentifié |
| **Admin** | `/admin` | Panel d'administration (upload, CRUD séries) | 🔒 Admin |

### Composants réutilisables

| Composant | Responsabilité |
|---|---|
| **Header** | Navigation Netflix-like avec effet scroll, barre de recherche intégrée, dropdown utilisateur |
| **SeriesCard** | Carte de série avec affiche, titre, note, hover effect |
| **SeriesModal** | Modal full-screen avec détails complets, système de notation, favoris, recommandations similaires |

### Fonctionnalités UX

- **Transition de recherche** : La barre de recherche est centrée sur la landing page, puis monte dans le header après la première recherche
- **Étoiles interactives** : Système de notation 1-5 avec feedback visuel au hover
- **Gestion d'état** : Context API (`AuthContext`) pour l'état d'authentification global
- **Intercepteurs Axios** : Injection automatique du JWT, redirection sur 401
- **Responsive** : Adaptatif mobile / tablette / desktop (3 breakpoints CSS)
- **Loading states** : Spinners, empty states, messages d'erreur clairs
- **Optimistic UI** : Feedback immédiat sur les actions (save, rate)

### Couche API (`api.js`)

Service centralisé avec 5 modules :

```javascript
// 5 services organisés par domaine
export const authService    = { register, login, logout, getCurrentUser, ... }
export const seriesService  = { search, getAll, getDetails, rateSeries, saveSeries, ... }
export const filterService  = { getGenres, getPlatforms, filterSeries }
export const userService    = { getAll, getUser, updateUser, deleteUser, getSavedSeries }
export const adminService   = { uploadSeries, uploadSubtitles, deleteSeries, updateSeriesMetadata }
```

---

## 🔐 Authentification & Sécurité

### Architecture de sécurité

| Couche | Mécanisme |
|---|---|
| **Hashage mots de passe** | Werkzeug `generate_password_hash` / `check_password_hash` |
| **Authentification** | JWT (JSON Web Tokens) via Flask-JWT-Extended |
| **Stockage client** | `localStorage` (access_token + user) |
| **Transport** | Axios interceptors (injection automatique du Bearer token) |
| **Expiration** | Gestion automatique du token expiré (redirect vers /login) |
| **CORS** | Configuration permissive pour le développement |
| **Autorisation** | 3 niveaux : Public, Authentifié, Admin |
| **XSS** | Protection native de React (escape automatique) |

### Système de permissions

```
Public          → Recherche, navigation, consultation
Authentifié     → Notation, favoris, profil, statistiques
Self ou Admin   → Modification/suppression de son propre compte
Admin           → Gestion des séries, upload, gestion des utilisateurs
```

### Route Guards (Frontend)

```jsx
// Protection des routes authentifiées
const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
};

// Protection des routes admin
const AdminRoute = ({ children }) => {
    return user?.is_admin ? children : <Navigate to="/" />;
};
```

---

## 🧪 Tests & Qualité — Postman

### Collection Postman complète

Le projet inclut une **collection Postman** testant exhaustivement les **28 endpoints** de l'API :

- **Tests automatisés** : Chaque requête inclut des scripts de test vérifiant les status codes, la structure des réponses et les données retournées
- **Variables d'environnement** : Gestion dynamique du JWT token et des IDs
- **Chaînage de requêtes** : Les tests sont ordonnés pour gérer les dépendances (ex : login avant les requêtes protégées)

### Résolution de bugs documentés

Les documents de suivi incluent :
- `POSTMAN_ERRORS_ANALYSIS.md` : Analyse des erreurs rencontrées
- `POSTMAN_FIXES.md` : Solutions appliquées
- `FOREIGN_KEY_FIX.md` : Résolution des contraintes FK lors des tests
- `BUGFIX_USER_DATA.md` : Correction des données utilisateur
- `CORRECTIONS_FINALES.md` : Corrections de la version finale

---

## 🚀 DevOps & Scripting

### Scripts de gestion

| Script | Rôle |
|---|---|
| `start.sh` | Démarre backend (Flask:5001) + frontend (Vite:5173), vérifie les ports |
| `start-dev.sh` | Mode développement avec rechargement automatique |
| `stop.sh` | Arrête proprement tous les processus |
| `run_pipeline.py` | Orchestrateur de la pipeline ETL complète (7 étapes séquentielles) |
| `check_setup.sh` | Vérifie les prérequis (Python, Node, PostgreSQL, .env) |

### Configuration externalisée

```python
# etl/config.py
DB_CONFIG = {
    'host':     os.getenv('DB_HOST', 'localhost'),
    'port':     int(os.getenv('DB_PORT', 5434)),
    'database': os.getenv('DB_NAME', 'postgres'),
    'user':     os.getenv('DB_USER', 'adam'),
    'password': os.getenv('DB_PASSWORD', 'mdp123')
}

TMDB_API_KEY    = os.getenv("TMDB_API_KEY")
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
```

---

## 📊 Compétences développées

### Développement web full-stack

- Conception et implémentation d'une **API REST** complète avec Flask
- Développement d'une **SPA React** moderne avec routing, guards et gestion état
- **Communication client-serveur** via Axios avec interceptors JWT
- Design **responsive** et **accessible** avec CSS natif

### Data Engineering

- Conception et implémentation d'une **pipeline ETL** complète en 7 étapes
- **Traitement NLP** : parsing de fichiers SRT, nettoyage de texte, gestion multilingue
- **Intégration d'APIs** : TMDB, Mistral AI, OpenAI
- Gestion des **formats de données hétérogènes** (ZIP imbriqués, encodages variés)

### Intelligence Artificielle & NLP

- Implémentation de l'algorithme **BM25 Okapi** pour la recherche full-text
- **TF-IDF + Cosine Similarity** pour le content-based filtering
- Utilisation de **LLMs** (Mistral AI) pour l'identification automatique de titres
- **Validation croisée** par keywords pour la correspondance série-TMDB

### Base de données

- Modélisation d'un **schéma relationnel** complexe (11 tables, FK, contraintes)
- Optimisation par **index** (GIN trigram, B-tree, index composites)
- Utilisation d'**extensions PostgreSQL** avancées (pg_trgm, unaccent)
- Requêtes SQL complexes (JOINs, sous-requêtes, agrégations, JSONB)

### Qualité logicielle

- **Tests API** automatisés avec Postman (28 endpoints couverts)
- **Documentation** technique exhaustive (API Endpoints, Features, Recommendations)
- Architecture **modulaire** (Blueprints Flask, composants React, services séparés)
- **Gestion de configuration** externalisée (.env, dotenv)

### DevOps

- Scripts de **démarrage/arrêt** automatisés
- **Pipeline orchestrée** avec gestion d'erreurs et reprise
- Gestion des **dépendances** (requirements.txt, package.json)

---

> **Projet réalisé dans le cadre de la SAÉ 5C01** — BUT Informatique, IUT de [Votre Ville]  
> **Technologies principales** : Python · Flask · React · PostgreSQL · Mistral AI · TMDB API  
> **Volume de données** : 15 000+ fichiers de sous-titres traités
