(function () {
  function normalizeLang(lang) {
    var value = (lang || "en").toLowerCase();
    if (value.indexOf("fr") === 0) return "fr";
    if (value.indexOf("es") === 0) return "es";
    return "en";
  }

  function getPageKey() {
    var path = window.location.pathname || "";
    var last = path.split("/").pop();
    if (!last) return "index.html";
    if (last.indexOf(".") === -1) return last.toLowerCase() + ".html";
    return last.toLowerCase();
  }

  function applyMeta(meta) {
    if (!meta) return;
    if (meta.title) {
      document.title = meta.title;
      var ogTitle = document.querySelector('meta[property="og:title"]');
      var twTitle = document.querySelector('meta[property="twitter:title"]');
      if (ogTitle) ogTitle.setAttribute("content", meta.title);
      if (twTitle) twTitle.setAttribute("content", meta.title);
    }
    if (meta.description) {
      var desc = document.querySelector('meta[name="description"]');
      var ogDesc = document.querySelector('meta[property="og:description"]');
      var twDesc = document.querySelector('meta[property="twitter:description"]');
      if (desc) desc.setAttribute("content", meta.description);
      if (ogDesc) ogDesc.setAttribute("content", meta.description);
      if (twDesc) twDesc.setAttribute("content", meta.description);
    }
  }

  function applyRules(rules) {
    if (!rules) return;
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i];
      var nodes = document.querySelectorAll(rule.selector);
      for (var j = 0; j < nodes.length; j++) {
        if (rule.html) {
          nodes[j].innerHTML = rule.text;
        } else {
          nodes[j].textContent = rule.text;
        }
      }
    }
  }

  var translations = {
    "index.html": {
      fr: {
        meta: {
          description:
            "Adam El Hirch est un étudiant en Data Science spécialisé en Business Intelligence, IA/ML et développement full-stack."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: '[data-i18n="hero_data"]', text: "données" },
          { selector: '[data-i18n="hero_ai"]', text: "ia / ml" },
          { selector: '[data-i18n="hero_business"]', text: "business" },
          { selector: '[data-i18n="hero_insights"]', text: "insights" },
          { selector: '[data-i18n="about_greeting"]', text: "Salut, je suis étudiant en BUT Informatique (parcours AGED)." },
          { selector: '[data-i18n="about_passion_1"]', text: "Je développe des projets IA, data et software orientés" },
          { selector: '[data-i18n="about_passion_2"]', text: "architecture, performance et impact concret. <br />", html: true },
          { selector: '[data-i18n="about_specialization"]', text: "En recherche de stage à partir de mars 2026" },
          { selector: '[data-i18n="cat_prog"]', text: "Programmation" },
          { selector: '[data-i18n="cat_ds"]', text: "Data Science & IA" },
          { selector: '[data-i18n="cat_de"]', text: "Data Engineering" },
          { selector: '[data-i18n="cat_bi"]', text: "Business Intelligence" },
          { selector: '[data-i18n="cat_soft"]', text: "Compétences comportementales" },
          { selector: '[data-i18n="skill_soft"]', text: "Résolution de problèmes, Gestion du stress, Adaptabilité, Travail en équipe, Résilience, Esprit critique" },
          { selector: '[data-i18n="cat_pm"]', text: "Gestion de projet" },
          { selector: '[data-i18n="cat_languages"]', text: "Langues" },
          { selector: '[data-i18n="skill_languages"]', text: "Français, English, Español, العربية" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-4 .span", text: "rôle" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-5 .span", text: "projet" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-6 .span", text: "année" },
          { selector: "#fullview .fullview__item .link", text: "Voir le projet" },
          { selector: "#fullview .fullview__close", text: "FERMER" },
          { selector: '[data-i18n="footer_title"]', text: "entrons en<br />contact", html: true },
          { selector: '[data-i18n="footer_email_label"]', text: "e-mail" },
          { selector: '[data-i18n="footer_github_label"]', text: "github" },
          { selector: '[data-i18n="footer_linkedin_label"]', text: "linkedin" }
        ]
      },
      es: {
        meta: {
          description:
            "Adam El Hirch es estudiante de Data Science especializado en Business Intelligence, IA/ML y desarrollo full-stack."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: '[data-i18n="hero_data"]', text: "datos" },
          { selector: '[data-i18n="hero_ai"]', text: "ia / ml" },
          { selector: '[data-i18n="hero_business"]', text: "negocio" },
          { selector: '[data-i18n="hero_insights"]', text: "insights" },
          { selector: '[data-i18n="about_greeting"]', text: "Hola, soy estudiante de BUT Informatique (itinerario AGED)." },
          { selector: '[data-i18n="about_passion_1"]', text: "Desarrollo proyectos de IA, datos y software enfocados en" },
          { selector: '[data-i18n="about_passion_2"]', text: "arquitectura, rendimiento e impacto real. <br />", html: true },
          { selector: '[data-i18n="about_specialization"]', text: "Busco prácticas a partir de marzo de 2026" },
          { selector: '[data-i18n="cat_prog"]', text: "Programación" },
          { selector: '[data-i18n="cat_ds"]', text: "Data Science e IA" },
          { selector: '[data-i18n="cat_de"]', text: "Data Engineering" },
          { selector: '[data-i18n="cat_bi"]', text: "Business Intelligence" },
          { selector: '[data-i18n="cat_soft"]', text: "Habilidades blandas" },
          { selector: '[data-i18n="skill_soft"]', text: "Resolución de problemas, Gestión del estrés, Adaptabilidad, Trabajo en equipo, Resiliencia, Pensamiento crítico" },
          { selector: '[data-i18n="cat_pm"]', text: "Gestión de proyectos" },
          { selector: '[data-i18n="cat_languages"]', text: "Idiomas" },
          { selector: '[data-i18n="skill_languages"]', text: "Español, Français, English, العربية" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-4 .span", text: "rol" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-5 .span", text: "proyecto" },
          { selector: ".main > .list-wrapper .project-name-wrap .div-6 .span", text: "año" },
          { selector: "#fullview .fullview__item .link", text: "Ver proyecto" },
          { selector: "#fullview .fullview__close", text: "CERRAR" },
          { selector: '[data-i18n="footer_title"]', text: "pongámonos en<br />contacto", html: true },
          { selector: '[data-i18n="footer_email_label"]', text: "correo" },
          { selector: '[data-i18n="footer_github_label"]', text: "github" },
          { selector: '[data-i18n="footer_linkedin_label"]', text: "linkedin" }
        ]
      }
    },
    "candigo.html": {
      fr: {
        meta: {
          title: "Adam El Hirch | CandiGO",
          description:
            "CandiGO est une plateforme de candidature propulsée par l'IA qui automatise la recherche d'emploi de manière intelligente."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: ".hero .div-4 .hero-text._1", text: "client :" },
          { selector: ".hero .div-4 .hero-text-under._1", text: "Projet personnel" },
          { selector: ".hero .div-5 .hero-text._2", text: "rôle :" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Développement full-stack, Product Design" },
          { selector: ".hero .div-6 .hero-text._3", text: "année :" },
          { selector: "#heading-container1 h4:nth-child(2)", text: "plateforme IA de" },
          { selector: "#heading-container1 h4:nth-child(3)", text: "candidature" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "CandiGO est une plateforme de candidature propulsée par l'IA qui transforme le processus long et fatigant d'adaptation des CV et lettres de motivation en un workflow intelligent et fluide. Pensée pour les étudiants et jeunes actifs en France à la recherche de stages, d'alternances et de premiers postes."
          },
          { selector: "#heading-container2 h4", text: "Le problème" },
          {
            selector: "#heading-container2 + .wrap.project .text-block.project",
            text: "Les candidats passent plus de 2 heures par candidature à adapter manuellement leur CV et leur lettre de motivation. Les ATS éliminent plus de 75 % des candidatures avant lecture humaine, en rejetant souvent les CV visuels de type Canva."
          },
          { selector: "#heading-container3 h4", text: "La solution" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "CandiGO automatise tout le workflow de candidature grâce à une extension navigateur pour importer une offre en un clic. L'IA sélectionne les compétences, expériences et formations pertinentes, puis les aligne avec les mots-clés de l'offre pour générer des CV et lettres de motivation personnalisés, optimisés ATS, en moins de 10 minutes.<br><br><strong>90 % de gain de temps :</strong> de 2 heures à 10 minutes par candidature.",
            html: true
          },
          { selector: "#heading-container4", text: "projet suivant" },
          { selector: 'a[href="#top"].bold-text.small', text: "retour en haut" },
          { selector: '#contact a[href^="mailto:"]', text: "e-mail" }
        ]
      },
      es: {
        meta: {
          title: "Adam El Hirch | CandiGO",
          description:
            "CandiGO es una plataforma de candidaturas impulsada por IA que automatiza la búsqueda de empleo de forma inteligente."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: ".hero .div-4 .hero-text._1", text: "cliente:" },
          { selector: ".hero .div-4 .hero-text-under._1", text: "Proyecto personal" },
          { selector: ".hero .div-5 .hero-text._2", text: "rol:" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Desarrollo full-stack, diseño de producto" },
          { selector: ".hero .div-6 .hero-text._3", text: "año:" },
          { selector: "#heading-container1 h4:nth-child(2)", text: "plataforma de IA para" },
          { selector: "#heading-container1 h4:nth-child(3)", text: "candidaturas" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "CandiGO es una plataforma de candidaturas impulsada por IA que transforma el proceso agotador de adaptar CV y carta de presentación en un flujo inteligente y rápido. Está diseñada para estudiantes y jóvenes profesionales en Francia que buscan prácticas, alternancia y primeros empleos."
          },
          { selector: "#heading-container2 h4", text: "El problema" },
          {
            selector: "#heading-container2 + .wrap.project .text-block.project",
            text: "Los candidatos dedican más de 2 horas por solicitud para adaptar manualmente CV y carta. Los ATS filtran más del 75 % de las candidaturas antes de revisión humana y suelen descartar CV visuales tipo Canva."
          },
          { selector: "#heading-container3 h4", text: "La solución" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "CandiGO automatiza todo el flujo de candidatura con una extensión de navegador para importar ofertas en un clic. La IA selecciona competencias, experiencias y formación relevantes, y las alinea con palabras clave de la oferta para generar CV y cartas personalizados, optimizados para ATS, en menos de 10 minutos.<br><br><strong>90 % menos de tiempo:</strong> de 2 horas a 10 minutos por candidatura.",
            html: true
          },
          { selector: "#heading-container4", text: "siguiente proyecto" },
          { selector: 'a[href="#top"].bold-text.small', text: "volver arriba" },
          { selector: '#contact a[href^="mailto:"]', text: "correo" }
        ]
      }
    },
    "seriesflix.html": {
      fr: {
        meta: {
          title: "Adam El Hirch | SeriesFlix",
          description:
            "SeriesFlix est un moteur de recherche et de recommandation full-stack de séries TV basé sur l'analyse de sous-titres."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: ".hero .div-4 .hero-text._1", text: "client :" },
          { selector: ".hero .div-5 .hero-text._2", text: "rôle :" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Data Engineer, Développeur full-stack" },
          { selector: ".hero .div-6 .hero-text._3", text: "année :" },
          { selector: "#heading-container h4:nth-child(2)", text: "Recherche de séries TV" },
          { selector: "#heading-container h4:nth-child(3)", text: "& recommandation" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "SeriesFlix est un moteur full-stack de recherche et de recommandation de séries TV, basé sur le NLP pour analyser plus de 15 000 sous-titres. Construit avec Flask, React et PostgreSQL, il intègre un ranking BM25 et un filtrage basé contenu pour des recommandations personnalisées."
          },
          { selector: "#heading-container3 h4", text: "Le challenge" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "Le principal défi était de traiter et d'indexer un très grand volume de données textuelles non structurées provenant de fichiers SRT. J'ai construit un pipeline ETL automatisé qui décompresse, parse, nettoie et indexe les sous-titres, avec enrichissement des métadonnées via Mistral AI et récupération des visuels/cast via l'API TMDB."
          },
          { selector: "#heading-container5 h4:nth-child(1)", text: "Fonctionnalités" },
          { selector: "#heading-container5 h4:nth-child(2)", text: "clés" },
          { selector: "#heading-container5 + .wrap.project li:nth-child(1)", text: "<strong>Recherche BM25 :</strong> recherche par contenu réel de dialogues avec score de pertinence.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(2)", text: "<strong>Recommandations IA :</strong> filtrage basé contenu avec TF-IDF et similarité cosinus.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(3)", text: "<strong>Ingestion des métadonnées :</strong> pipeline automatisé avec Mistral AI pour l'identification des séries.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(4)", text: "<strong>Dashboard admin :</strong> gestion CRUD complète et traitement des uploads de sous-titres.", html: true },
          { selector: "#heading-container4", text: "projet suivant" },
          { selector: 'a[href="#top"].bold-text.small', text: "retour en haut" },
          { selector: '#contact a[href^="mailto:"]', text: "e-mail" }
        ]
      },
      es: {
        meta: {
          title: "Adam El Hirch | SeriesFlix",
          description:
            "SeriesFlix es un motor full-stack de búsqueda y recomendación de series de TV basado en análisis de subtítulos."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: ".hero .div-4 .hero-text._1", text: "cliente:" },
          { selector: ".hero .div-5 .hero-text._2", text: "rol:" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Data Engineer, desarrollador full-stack" },
          { selector: ".hero .div-6 .hero-text._3", text: "año:" },
          { selector: "#heading-container h4:nth-child(2)", text: "Búsqueda de series TV" },
          { selector: "#heading-container h4:nth-child(3)", text: "& recomendación" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "SeriesFlix es un motor full-stack de búsqueda y recomendación de series de TV que usa NLP para analizar más de 15.000 subtítulos. Construido con Flask, React y PostgreSQL, incorpora ranking BM25 y filtrado basado en contenido para recomendaciones personalizadas."
          },
          { selector: "#heading-container3 h4", text: "El reto" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "El principal reto fue procesar e indexar grandes volúmenes de datos textuales no estructurados de archivos SRT. Desarrollé un pipeline ETL automatizado que descomprime, parsea, limpia e indexa subtítulos, enriqueciendo metadatos con Mistral AI y recuperando pósters/reparto con la API de TMDB."
          },
          { selector: "#heading-container5 h4:nth-child(1)", text: "Funciones" },
          { selector: "#heading-container5 h4:nth-child(2)", text: "clave" },
          { selector: "#heading-container5 + .wrap.project li:nth-child(1)", text: "<strong>Búsqueda BM25:</strong> búsqueda por diálogos reales con puntuación de relevancia.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(2)", text: "<strong>Recomendaciones IA:</strong> filtrado basado en contenido con TF-IDF y similitud coseno.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(3)", text: "<strong>Ingesta de metadatos:</strong> pipeline automatizado con Mistral AI para identificar series.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(4)", text: "<strong>Panel admin:</strong> gestión CRUD completa y procesamiento de subida de subtítulos.", html: true },
          { selector: "#heading-container4", text: "siguiente proyecto" },
          { selector: 'a[href="#top"].bold-text.small', text: "volver arriba" },
          { selector: '#contact a[href^="mailto:"]', text: "correo" }
        ]
      }
    },
    "nutrisight.html": {
      fr: {
        meta: {
          title: "Adam El Hirch | NutriSight",
          description:
            "NutriSight est un dashboard d'analyse nutritionnelle conçu avec Power BI et KNIME, à partir de la base Open Food Facts."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: ".hero .div-4 .hero-text._1", text: "client :" },
          { selector: ".hero .div-5 .hero-text._2", text: "rôle :" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Data Analyst, Développeur BI" },
          { selector: ".hero .div-6 .hero-text._3", text: "année :" },
          { selector: "#heading-container h4:nth-child(2)", text: "Analyse nutritionnelle" },
          { selector: "#heading-container h4:nth-child(3)", text: "Dashboard" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "NutriSight est un projet de business intelligence qui transforme les données Open Food Facts en dashboards interactifs Power BI. Le projet comprend un pipeline ETL complet sous KNIME pour nettoyer, normaliser et enrichir les données nutritionnelles de milliers de produits, puis visualiser les insights clés autour des Nutri-scores, des tendances de vente et de la composition des produits."
          },
          { selector: "#heading-container3 h4", text: "Le challenge" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "La base Open Food Facts contient des millions d'entrées avec formats incohérents, valeurs manquantes et données nutritionnelles non structurées. Le défi était de construire un pipeline fiable pour nettoyer et standardiser ces données brutes, calculer des Nutri-scores pertinents et livrer des insights actionnables via des dashboards interactifs permettant d'explorer les produits par catégorie, pays et qualité nutritionnelle."
          },
          { selector: "#heading-container5 h4:nth-child(1)", text: "Stack" },
          { selector: "#heading-container5 h4:nth-child(2)", text: "technique" },
          {
            selector: "#heading-container5 + .wrap.project .text-block.project",
            text: "<strong>ETL :</strong> KNIME Analytics Platform - workflows de nettoyage, normalisation et transformation des données<br /><strong>Visualisation :</strong> Microsoft Power BI - dashboards interactifs avec slicers, jauges et drill-down<br /><strong>Source de données :</strong> Open Food Facts (CSV/API) - base alimentaire open source mondiale<br /><strong>Analyse :</strong> calcul Nutri-score, décomposition nutritionnelle, analyse des tendances de vente<br /><strong>Traitement des données :</strong> Excel, manipulation CSV, validation de qualité des données",
            html: true
          },
          { selector: "#heading-container6 h4:nth-child(1)", text: "Insights" },
          { selector: "#heading-container6 h4:nth-child(2)", text: "clés" },
          {
            selector: "#heading-container6 + .wrap.project .text-block.project",
            text: "<strong>Dashboard de recherche produit :</strong> explorateur interactif avec jauge Nutri-score en temps réel, métriques énergétiques (kJ/100g), quantité vendue et composition détaillée (lipides, sucres, protéines, fibres, sel) en donuts. Les localisations produits sont cartographiées.<br /><br /><strong>Dashboard d'analyse des ventes :</strong> vue multidimensionnelle des ventes par catégorie (épicerie, snacks, confiserie...), distribution des Nutri-scores sur 2,1M+ entrées, ventes par pays (US 42 %, France 27 %, UK 15 %) et top produits vendus.",
            html: true
          },
          { selector: "#heading-container8 h4:nth-child(1)", text: "Résultats" },
          { selector: "#heading-container8 h4:nth-child(2)", text: "clés" },
          {
            selector: "#heading-container8 + .wrap.project .text-block.project",
            text: "- Traitement et nettoyage de milliers de produits Open Food Facts<br />- Construction d'un pipeline ETL KNIME complet pour normalisation et assurance qualité<br />- Conception de 2 dashboards Power BI interactifs avec drill-down et filtres dynamiques<br />- Implémentation du calcul et de la visualisation du Nutri-score via jauges intuitives<br />- Analyse des tendances de vente sur 5 pays et plus de 11 catégories alimentaires<br />- Création d'un explorateur produit avec analyse nutritionnelle en temps réel",
            html: true
          },
          { selector: "#heading-container4", text: "projet suivant" },
          { selector: 'a[href="#top"].bold-text.small', text: "retour en haut" },
          { selector: '#contact a[href^="mailto:"]', text: "e-mail" }
        ]
      },
      es: {
        meta: {
          title: "Adam El Hirch | NutriSight",
          description:
            "NutriSight es un dashboard de análisis nutricional desarrollado con Power BI y KNIME sobre la base Open Food Facts."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: ".hero .div-4 .hero-text._1", text: "cliente:" },
          { selector: ".hero .div-5 .hero-text._2", text: "rol:" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Data Analyst, desarrollador BI" },
          { selector: ".hero .div-6 .hero-text._3", text: "año:" },
          { selector: "#heading-container h4:nth-child(2)", text: "Análisis nutricional" },
          { selector: "#heading-container h4:nth-child(3)", text: "Dashboard" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "NutriSight es un proyecto de business intelligence que transforma los datos de Open Food Facts en dashboards interactivos de Power BI. El proyecto incluyó un pipeline ETL completo en KNIME para limpiar, normalizar y enriquecer datos nutricionales de miles de productos, y visualizar insights clave sobre Nutri-score, patrones de ventas y composición de productos."
          },
          { selector: "#heading-container3 h4", text: "El reto" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "La base Open Food Facts contiene millones de registros con formatos inconsistentes, valores faltantes y datos nutricionales no estructurados. El reto fue construir un pipeline fiable para limpiar y estandarizar esos datos, calcular Nutri-scores relevantes y entregar insights accionables mediante dashboards interactivos para explorar productos por categoría, país y calidad nutricional."
          },
          { selector: "#heading-container5 h4:nth-child(1)", text: "Stack" },
          { selector: "#heading-container5 h4:nth-child(2)", text: "técnico" },
          {
            selector: "#heading-container5 + .wrap.project .text-block.project",
            text: "<strong>ETL:</strong> KNIME Analytics Platform - flujos de limpieza, normalización y transformación de datos<br /><strong>Visualización:</strong> Microsoft Power BI - dashboards interactivos con segmentadores, medidores y drill-down<br /><strong>Fuente de datos:</strong> Open Food Facts (CSV/API) - base alimentaria open source global<br /><strong>Análisis:</strong> cálculo de Nutri-score, desglose nutricional, análisis de patrones de venta<br /><strong>Procesamiento de datos:</strong> Excel, manipulación CSV, validación de calidad de datos",
            html: true
          },
          { selector: "#heading-container6 h4:nth-child(1)", text: "Insights" },
          { selector: "#heading-container6 h4:nth-child(2)", text: "clave" },
          {
            selector: "#heading-container6 + .wrap.project .text-block.project",
            text: "<strong>Dashboard de búsqueda de productos:</strong> explorador interactivo con medidor Nutri-score en tiempo real, métricas energéticas (kJ/100g), cantidad vendida y composición detallada (grasa, azúcar, proteína, fibra, sal) en gráficos donut. Las ubicaciones de productos se muestran en mapa.<br /><br /><strong>Dashboard de análisis de ventas:</strong> desglose multidimensional de ventas por categoría (supermercado, snacks, confitería...), distribución de Nutri-score sobre más de 2,1M registros, ventas por país (EE.UU. 42 %, Francia 27 %, Reino Unido 15 %) y productos más vendidos.",
            html: true
          },
          { selector: "#heading-container8 h4:nth-child(1)", text: "Logros" },
          { selector: "#heading-container8 h4:nth-child(2)", text: "clave" },
          {
            selector: "#heading-container8 + .wrap.project .text-block.project",
            text: "- Procesamiento y limpieza de miles de productos de Open Food Facts<br />- Construcción de un pipeline ETL completo en KNIME para normalización y control de calidad<br />- Diseño de 2 dashboards interactivos en Power BI con drill-down y filtros dinámicos<br />- Implementación del cálculo y visualización de Nutri-score con medidores intuitivos<br />- Análisis de patrones de venta en 5 países y más de 11 categorías alimentarias<br />- Creación de un explorador de productos con desglose nutricional en tiempo real",
            html: true
          },
          { selector: "#heading-container4", text: "siguiente proyecto" },
          { selector: 'a[href="#top"].bold-text.small', text: "volver arriba" },
          { selector: '#contact a[href^="mailto:"]', text: "correo" }
        ]
      }
    },
    "yelp-analytics.html": {
      fr: {
        meta: {
          title: "Adam El Hirch | Yelp Data Analytics",
          description:
            "Yelp Data Analytics est un projet de data engineering et NLP sur le dataset Yelp Academic avec dashboards analytiques."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: ".hero .div-4 .hero-text._1", text: "client :" },
          { selector: ".hero .div-5 .hero-text._2", text: "rôle :" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Architecte projet, Chef de projet" },
          { selector: ".hero .div-6 .hero-text._3", text: "année :" },
          { selector: "#heading-container h4:nth-child(2)", text: "Data Engineering & NLP" },
          { selector: "#heading-container h4:nth-child(3)", text: "Analytics" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "Projet académique data à grande échelle sur Yelp Academic. J'ai tenu principalement un rôle d'architecte projet et de chef de projet, en planifiant l'intégralité du projet sur Linear pour permettre à une équipe de 5 de travailler efficacement. J'ai conçu le workflow de bout en bout : ingestion JSONL volumineuse, nettoyage qualité des données, conversion Parquet, préparation NLP et analyse via dashboards pour extraire des insights actionnables sur les comportements reviewers et la qualité des avis."
          },
          { selector: "#heading-container3 h4", text: "Pipeline & méthode" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "Défi principal : transformer des données Yelp brutes hétérogènes en une base analytique fiable tout en pilotant une livraison multi-contributeurs. J'ai structuré la roadmap, les jalons et la répartition des tâches dans Linear pour une équipe de 5. Le pipeline inclut nettoyage robuste (doublons, clés critiques manquantes, normalisation types/dates), persistance Parquet pour la performance, puis préparation NLP (tokenization, stopwords, lemmatization) avant analyse TF-IDF/Word2Vec."
          },
          { selector: "#heading-container5 h4", text: "Insights clés" },
          { selector: "#heading-container5 + .wrap.project li:nth-child(1)", text: "<strong>Profils reviewers :</strong> différences nettes de sévérité et de verbosité selon le profil utilisateur.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(2)", text: "<strong>Dynamique des avis :</strong> relation observable entre longueur des avis et nombre d'étoiles.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(3)", text: "<strong>Répartition satisfaction :</strong> distribution des sentiments dérivée des classes d'étoiles.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(4)", text: "<strong>Stack réutilisable :</strong> insights notebook consolidés dans des modules Python réutilisables.", html: true },
          { selector: "#heading-container4", text: "projet suivant" },
          { selector: 'a[href="#top"].bold-text.small', text: "retour en haut" },
          { selector: '#contact a[href^="mailto:"]', text: "e-mail" }
        ]
      },
      es: {
        meta: {
          title: "Adam El Hirch | Yelp Data Analytics",
          description:
            "Yelp Data Analytics es un proyecto de data engineering y NLP sobre Yelp Academic con dashboards analíticos."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: ".hero .div-4 .hero-text._1", text: "cliente:" },
          { selector: ".hero .div-5 .hero-text._2", text: "rol:" },
          { selector: ".hero .div-5 .hero-text-under._2", text: "Arquitecto del proyecto, Project Manager" },
          { selector: ".hero .div-6 .hero-text._3", text: "año:" },
          { selector: "#heading-container h4:nth-child(2)", text: "Data Engineering & NLP" },
          { selector: "#heading-container h4:nth-child(3)", text: "Analytics" },
          {
            selector: "#heading-container-desc .text-block.project",
            text: "Proyecto académico de datos a gran escala sobre Yelp Academic. Mi rol principal fue arquitecto del proyecto y project manager, planificando el proyecto completo en Linear para que un equipo de 5 pudiera trabajar de forma eficiente. Diseñé el flujo end-to-end: ingesta de JSONL voluminoso, limpieza de calidad, conversión a Parquet, preparación NLP y análisis con dashboards para obtener insights accionables sobre comportamiento de reviewers y calidad de reseñas."
          },
          { selector: "#heading-container3 h4", text: "Pipeline y método" },
          {
            selector: "#heading-container3 + .wrap.project .text-block.project",
            text: "Reto principal: transformar datos Yelp crudos y heterogéneos en una base analítica fiable mientras se coordinaba una entrega con varios colaboradores. Estructuré la hoja de ruta, hitos y ownership de tareas en Linear para un equipo de 5. El pipeline incluye limpieza robusta (duplicados, claves críticas faltantes, normalización de tipos/fechas), persistencia en Parquet para rendimiento, y preparación NLP (tokenización, stopwords, lematización) antes del análisis TF-IDF/Word2Vec."
          },
          { selector: "#heading-container5 h4", text: "Insights clave" },
          { selector: "#heading-container5 + .wrap.project li:nth-child(1)", text: "<strong>Perfiles de reviewers:</strong> diferencias claras de severidad y verbosidad según perfil de usuario.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(2)", text: "<strong>Dinámica de reseñas:</strong> relación observable entre longitud de reseña y puntuación en estrellas.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(3)", text: "<strong>Distribución de satisfacción:</strong> reparto de sentimiento derivado de clases de estrellas.", html: true },
          { selector: "#heading-container5 + .wrap.project li:nth-child(4)", text: "<strong>Stack reutilizable:</strong> insights de notebooks consolidados en módulos Python reutilizables.", html: true },
          { selector: "#heading-container4", text: "siguiente proyecto" },
          { selector: 'a[href="#top"].bold-text.small', text: "volver arriba" },
          { selector: '#contact a[href^="mailto:"]', text: "correo" }
        ]
      }
    },
    "about.html": {
      fr: {
        meta: {
          title: "Adam El Hirch | À propos",
          description: "À propos d'Adam El Hirch : IA, architecture logicielle, performance et pilotage de projet."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Projets" },
          { selector: ".nav-link._2 .overflow._2", text: "À propos" },
          { selector: ".nav-link._3 .overflow._3", text: "Contact" },
          { selector: '[data-i18n=\"about_page_resume_btn\"]', text: "cv ->" },
          { selector: '[data-i18n=\"about_page_hero_1\"]', text: "créons" },
          { selector: '[data-i18n=\"about_page_hero_2\"]', text: "quelque chose" },
          { selector: '[data-i18n=\"about_page_hero_3\"]', text: "de fort" },
          { selector: '[data-i18n=\"about_page_hero_4\"]', text: "ensemble" },
          { selector: '[data-i18n=\"about_page_intro_1\"]', text: "Je suis étudiant en BUT Informatique (parcours AGED)." },
          { selector: '[data-i18n=\"about_page_intro_2\"]', text: "Je me concentre sur les systèmes d'IA, les architectures avancées et l'ingénierie orientée performance." },
          { selector: '[data-i18n=\"about_page_intro_3\"]', text: "Je recherche actuellement un stage à partir de mars 2026." },
          { selector: '[data-i18n=\"about_page_intro_4\"]', text: "L'an dernier, j'ai effectué un stage dans une SARL au Maroc, où j'ai travaillé sur l'extraction, le nettoyage et la structuration de données, ainsi que sur la production de tableaux de bord de reporting opérationnel." },
          { selector: '[data-i18n=\"about_page_focus_title\"]', text: "Domaines de focus" },
          { selector: '[data-i18n=\"about_page_focus_1\"]', text: "Systèmes d'IA, LLM, Machine Learning et NLP." },
          { selector: '[data-i18n=\"about_page_focus_2\"]', text: "Architectures logicielles avancées et concepts techniques approfondis." },
          { selector: '[data-i18n=\"about_page_focus_3\"]', text: "Compréhension des systèmes en profondeur, limites et stratégies d'optimisation." },
          { selector: '[data-i18n=\"about_page_focus_4\"]', text: "Technologies modernes comme Rust, avec un focus performance et sécurité." },
          { selector: '[data-i18n=\"about_page_focus_5\"]', text: "Projets open source et expérimentaux à forte ambition technique." },
          { selector: '[data-i18n=\"about_page_work_title\"]', text: "Ma façon de travailler" },
          { selector: '[data-i18n=\"about_page_work_text\"]', text: "Je combine profondeur technique et exécution structurée : planification, priorisation, optimisation des ressources et ownership de bout en bout. Mon objectif est d'évoluer vers des rôles techniques à responsabilité : architecture logicielle, lead technique, R&D et création de produit." },
          { selector: '[data-i18n=\"footer_title\"]', text: "entrons en<br />contact", html: true },
          { selector: '[data-i18n=\"footer_email_label\"]', text: "e-mail" },
          { selector: '[data-i18n=\"footer_github_label\"]', text: "github" },
          { selector: '[data-i18n=\"footer_linkedin_label\"]', text: "linkedin" }
        ]
      },
      es: {
        meta: {
          title: "Adam El Hirch | Sobre mí",
          description: "Sobre Adam El Hirch: IA, arquitectura de software, rendimiento y gestión técnica de proyectos."
        },
        rules: [
          { selector: ".nav-link._1 .overflow._1", text: "Proyectos" },
          { selector: ".nav-link._2 .overflow._2", text: "Sobre mí" },
          { selector: ".nav-link._3 .overflow._3", text: "Contacto" },
          { selector: '[data-i18n=\"about_page_resume_btn\"]', text: "cv ->" },
          { selector: '[data-i18n=\"about_page_hero_1\"]', text: "creemos" },
          { selector: '[data-i18n=\"about_page_hero_2\"]', text: "algo" },
          { selector: '[data-i18n=\"about_page_hero_3\"]', text: "potente" },
          { selector: '[data-i18n=\"about_page_hero_4\"]', text: "juntos" },
          { selector: '[data-i18n=\"about_page_intro_1\"]', text: "Soy estudiante de BUT Informatique (itinerario AGED)." },
          { selector: '[data-i18n=\"about_page_intro_2\"]', text: "Me enfoco en sistemas de IA, arquitecturas avanzadas e ingeniería orientada al rendimiento." },
          { selector: '[data-i18n=\"about_page_intro_3\"]', text: "Actualmente busco prácticas a partir de marzo de 2026." },
          { selector: '[data-i18n=\"about_page_intro_4\"]', text: "El año pasado hice prácticas en una SARL en Marruecos, donde trabajé en extracción, limpieza y estructuración de datos, además de la elaboración de dashboards de reporting operativo." },
          { selector: '[data-i18n=\"about_page_focus_title\"]', text: "Áreas de enfoque" },
          { selector: '[data-i18n=\"about_page_focus_1\"]', text: "Sistemas de IA, LLM, Machine Learning y NLP." },
          { selector: '[data-i18n=\"about_page_focus_2\"]', text: "Arquitecturas de software avanzadas y conceptos técnicos profundos." },
          { selector: '[data-i18n=\"about_page_focus_3\"]', text: "Comprensión profunda de sistemas, límites y estrategias de optimización." },
          { selector: '[data-i18n=\"about_page_focus_4\"]', text: "Tecnologías modernas como Rust, con foco en rendimiento y seguridad." },
          { selector: '[data-i18n=\"about_page_focus_5\"]', text: "Proyectos open source y experimentales con alta exigencia técnica." },
          { selector: '[data-i18n=\"about_page_work_title\"]', text: "Cómo trabajo" },
          { selector: '[data-i18n=\"about_page_work_text\"]', text: "Combino profundidad técnica con ejecución estructurada: planificación, priorización, optimización de recursos y ownership end-to-end. Mi objetivo es evolucionar hacia roles técnicos de responsabilidad: arquitectura, lead técnico, I+D y creación de producto." },
          { selector: '[data-i18n=\"footer_title\"]', text: "pongámonos en<br />contacto", html: true },
          { selector: '[data-i18n=\"footer_email_label\"]', text: "correo" },
          { selector: '[data-i18n=\"footer_github_label\"]', text: "github" },
          { selector: '[data-i18n=\"footer_linkedin_label\"]', text: "linkedin" }
        ]
      }
    }
  };

  function getLanguageFromQuery() {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get("lang");
    return lang ? normalizeLang(lang) : null;
  }

  function resolveLanguage(forced) {
    if (forced) return normalizeLang(forced);
    var queryLang = getLanguageFromQuery();
    if (queryLang) return queryLang;
    var navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return normalizeLang(navLang);
  }

  function apply(forcedLanguage) {
    var page = getPageKey();
    var pageTranslations = translations[page];
    if (!pageTranslations) return;

    var lang = resolveLanguage(forcedLanguage);
    var selected = pageTranslations[lang];

    document.documentElement.setAttribute("lang", lang);

    if (!selected) {
      return;
    }

    applyMeta(selected.meta);
    applyRules(selected.rules);
  }

  window.SiteI18n = {
    apply: apply
  };
})();
