# Portfolio – Style Guide & Architecture

Ce document définit la structure, le style et les conventions pour le portfolio d'Adam El Hirch.
Le design est basé sur nicolasfol.webflow.io.

---

## 1. Design System

### Identité visuelle

| Élément          | Valeur                                                                 |
|------------------|------------------------------------------------------------------------|
| Background       | Gris clair / off-white (#E0E0E0 / #DCDCDC) avec texture grain animée  |
| Texte principal  | Noir / gris foncé (#333333, #1a1a1a)                                  |
| Accent           | Halo bleu lumineux sur les bords du viewport (WebGL/Three.js)         |
| Police           | **Lato** (Google Fonts) — weights: 100 à 900 + italiques              |
| Grille           | 8 colonnes verticales visibles (lignes fines semi-transparentes)      |
| Curseur          | Custom cursor circulaire suivant la souris                            |
| Effet global     | Grain overlay fixe (Grained.js, opacity 0.15)                        |

### Typographie

- **Hero / Titres majeurs** : Très grand (8-12vw), bold/black weight, sans-serif
- **Sous-titres / labels** : Petit, light weight, souvent en majuscules ou lowercase
- **Body text** : Regular weight, taille standard (~16-18px)
- **Texte intro** : Grand, light/thin weight, couleur très atténuée (quasi invisible, apparaît au scroll)

### Effets & Animations

- **Grain overlay** : Texture grain animée fixe sur tout le viewport (Grained.js)
- **Blue edge glow** : Halo bleu lumineux autour des bords du viewport (Three.js/WebGL)
- **Fade-up** : Éléments qui montent avec opacity au scroll (anime.js + inview)
- **Texte lettre par lettre** : Animation caractère par caractère (classe `.tricks`)
- **Barres de compétences** : Barres verticales noires qui grandissent au scroll (style bar chart)
- **Delayed navigation** : Transition de 2s avant la navigation entre pages
- **Blur text** : Certains textes apparaissent floutés puis se défloutent au scroll

---

## 2. Structure des Pages

### Architecture du site

```
index.html          → Page d'accueil (Work)
about.html          → Page À propos (optionnelle)
contact.html        → Page Contact (optionnelle)
candigo.html        → Page projet CandiGO
cinematch.html      → Page projet CineMatch
[projet].html       → Autres pages projets
style.css           → Styles principaux (fichier Webflow exporté)
images/             → Assets images
```

### Template HTML de base

```html
<!DOCTYPE html>
<html data-wf-domain="nicolasfol.webflow.io" data-wf-page="[ID_PAGE]"
      data-wf-site="600be19268d1cb46eb5169bf" data-wf-status="1"
      class="w-mod-js w-mod-ix wf-lato-n1-active wf-lato-i1-active wf-lato-n3-active wf-lato-i3-active wf-lato-n4-active wf-lato-i4-active wf-lato-n7-active wf-lato-i7-active wf-lato-n9-active wf-lato-i9-active wf-active">
```

---

## 3. Composants Communs (toutes les pages)

### 3.1 Head – CSS et Fonts

```html
<link href="style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic" media="all">
<script type="text/javascript">
WebFont.load({
  google: {
    families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic"]
  }
});
</script>
```

### 3.2 Navigation

```html
<div class="navigation">
  <!-- .menu-wrapper = bouton menu hamburger -->
  <!-- .titel-wrap = Logo/nom → lien vers index.html -->
  <!-- .nav-menu = Menu (Work, About, Contact) -->
  <!-- .social-wrapper = Liens sociaux (GitHub, LinkedIn) -->
</div>
```

> [!IMPORTANT]
> Tous les liens internes doivent pointer vers les fichiers locaux (`index.html`, `candigo.html`, etc.), **PAS** vers nicolasfol.webflow.io.

### 3.3 Grain Overlay (obligatoire)

```html
<div class="w-embed">
  <div id="hero" class="grain-overlay"></div>
  <style>
  .grain-overlay {
    pointer-events: none;
    position: fixed !Important;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
  }
  </style>
</div>
```

### 3.4 Custom Cursor (obligatoire)

```html
<div class="html-cursor w-embed">
  <div class="cursor"></div>
</div>
```

### 3.5 Lignes verticales décoratives (grille 8 colonnes)

```html
<div class="line-wrapper">
  <div class="inner-line-wrapper _1"><div class="line _1"></div></div>
  <div class="inner-line-wrapper"><div class="line _2"></div></div>
  <div class="inner-line-wrapper"><div class="line _3"></div></div>
  <div class="inner-line-wrapper"><div class="line _4"></div></div>
  <div class="inner-line-wrapper"><div class="line _5"></div></div>
  <div class="inner-line-wrapper"><div class="line _6"></div></div>
  <div class="inner-line-wrapper _1"><div class="line _7"></div></div>
</div>
```

### 3.6 Footer

```html
<div id="contact" class="section footer">
  <div class="list-wrapper next-project">
    <div class="btm-line-copy"></div>
  </div>
  <div class="wrapper next">
    <div class="flex-item next-copy">
      <ul role="list" class="w-list-unstyled">
        <li><a href="#top" class="bold-text small w--current">back to top</a></li>
      </ul>
    </div>
    <div class="contact-wrap">
      <div class="flex-item next">
        <ul role="list" class="w-list-unstyled">
          <li><a href="mailto:contact@adamelhirch.com" class="bold-text small">mail</a></li>
        </ul>
      </div>
      <div class="flex-item next">
        <ul role="list" class="w-list-unstyled">
          <li class="list-ite"><a href="https://github.com/adamelhirch" class="bold-text small">github</a></li>
        </ul>
      </div>
      <div class="flex-item next">
        <ul role="list" class="w-list-unstyled">
          <li><a href="https://www.linkedin.com/in/adam-el-hirch" class="bold-text small">linkedin</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## 4. Page d'Accueil (index.html)

### Sections dans l'ordre

1. **Navigation** (fixe en haut)
2. **Hero** — Grande typo "design code ui/ux variables" (mots-clés du designer)
3. **Intro text** — Texte de présentation en grande taille, light weight, couleur atténuée
4. **Skills** — Barres verticales noires (style bar chart) + labels en texte vertical (ex: ux ui, teamwork, figma, webflow, design systems, variables)
5. **Marquee texte** — Bande de mots défilants multilingues ("skills", "fertigkeiten", "기술", "projekte", "case-studys")
6. **Project list** — Tableau avec 3 colonnes : role | project | year. Chaque ligne est un lien vers la page projet
7. **Footer/Contact** — Liens sociaux (email, github, linkedin)

### Project list (structure)

```html
<!-- En-tête du tableau -->
<div class="list-wrapper">
  <div>role</div>
  <div>project</div>
  <div>year</div>
</div>

<!-- Ligne projet (lien clickable) -->
<a href="candigo.html" class="grid-item">
  <div><!-- role tags: ux/ui, coding --></div>
  <h2>CandiGO</h2>
  <div>2025</div>
  <!-- thumb-img__small + thumb-img__large pour hover effect Three.js -->
</a>
```

---

## 5. Pages Projet

### Structure type

1. **Navigation**
2. **Hero** — Image de fond plein écran + barre meta (client, role, year)
3. **Section titre + description** — Titre à gauche, description longue à droite
4. **Section(s) images** — Grille d'images du projet
5. **Section "Next Project"** — Lien vers le projet suivant avec effet Three.js
6. **Footer**

### Hero Section

```html
<div id="top" class="hero">
  <div class="list-wrapper project">
    <div class="project-name-wrap">
      <div class="div-4">
        <div class="hero-text _1">client:<br></div>
        <div class="hero-text-under _1">Personal Project</div>
      </div>
      <div class="div-5">
        <div class="hero-text _2">role: </div>
        <div class="hero-text-under _2">Full-Stack Dev, Product Design</div>
      </div>
      <div class="div-6">
        <div class="hero-text _3">year:<br></div>
        <div class="hero-text-under _3">2025</div>
      </div>
    </div>
    <div class="hero-line"></div>
  </div>
  <div class="bg-image-wrapper nom-projet"></div>
</div>
```

Pour l'image de fond, ajouter dans le CSS :
```css
.bg-image-wrapper.nom-projet {
  background-image: url('images/nom-projet-hero.jpg');
}
```

### Section Titre + Description

```html
<div class="section project">
  <div class="wrapper flex">
    <div id="heading-container" class="wrap h4">
      <h4 class="fade-up tricks">Titre du projet</h4>
      <h4 class="fade-up tricks">Description courte</h4>
    </div>
    <div id="heading-container2" class="wrap project">
      <div class="text-block project">
        Description longue du projet...
      </div>
    </div>
  </div>
</div>
```

### Section Images

```html
<div class="section project img">
  <div class="w-layout-grid project-img-grid">
    <img src="images/screenshot.jpg" loading="lazy" alt="Description" class="basic-img" />
  </div>
</div>
```

### Section "Next Project"

```html
<div data-w-id="Section 2" class="section next">
  <div class="list-wrapper next-project"><div class="btm-line"></div></div>
  <div id="app" class="app"></div>
  <main class="main-copy">
    <h2 id="heading-container4" class="fade-up4 tricks">next<br></h2>
    <div id="itemsWrapper" class="grid project">
      <a href="[next-project].html" class="grid-item item-1-copy w-inline-block">
        <div class="thumb-img__small project w-embed">
          <img class="grid__item-img" src="thumbnail-small.jpg" crossorigin="anonymous">
        </div>
        <div class="thumb-img__large project w-embed">
          <img class="grid__item-img grid__item-img--large" src="thumbnail-large.jpg" crossorigin="anonymous">
        </div>
      </a>
    </div>
    <div id="fullview" class="fullview">
      <div class="fullview__item w-clearfix">
        <h2 class="fullview__item-title">Nom Projet Suivant</h2>
        <a href="[next-project].html" class="link">View Project</a>
      </div>
      <a href="#" class="fullview__close w-button">CLOSE</a>
    </div>
  </main>
</div>
```

---

## 6. Page About

### Structure type

1. **Navigation**
2. **Hero typographique** — Grande typo "Lets create something together" avec images intégrées entre les mots
3. **Section bio** — Texte "Hoi! I'm [Nom], a designer" + photo/image
4. **Footer**

---

## 7. Scripts (fin de `<body>`, dans cet ordre exact)

### 1. jQuery
```html
<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=600be19268d1cb46eb5169bf" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
```

### 2. Webflow
```html
<script src="https://cdn.prod.website-files.com/600be19268d1cb46eb5169bf/js/webflow.e34f84b99bfc9a211b7f79a8633e7240.js" type="text/javascript"></script>
```

### 3. Grained.js (grain animé)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/grained/0.0.2/grained.min.js"></script>
<script>
var options = {
  "animate": true,
  "patternWidth": 600,
  "patternHeight": 600,
  "grainOpacity": 0.15,
  "grainDensity": 1,
  "grainWidth": 0.7,
  "grainHeight": 0.7,
}
grained("#hero", options);
</script>
```

### 4. Custom Cursor
```html
<script>
  var $cursor = $('.cursor');
  function moveCursor(e) {
    $cursor.addClass('is-moving');
    $cursor.css({"top": e.pageY, "left": e.pageX});
    clearTimeout(timer2);
    var timer2 = setTimeout(function() {
      $cursor.removeClass('is-moving');
    }, 300);
  }
  $(window).on('mousemove', moveCursor);
</script>
```

### 5. Delayed Navigation
```html
<script>
  $('a.link, a.grid-item, a.nav-link, a.titel').click(function (e) {
    e.preventDefault();
    var goTo = this.getAttribute("href");
    setTimeout(function(){
      window.location = goTo;
    }, 2000);
  });
</script>
```

### 6. Anime.js (animations texte)
```html
<style>.letter {display: inline-block;} .tricksword {white-space: nowrap;}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/protonet-jquery.inview/1.1.2/jquery.inview.min.js"></script>
```
→ Puis le script d'initialisation anime.js (voir `candigo.html` pour le script complet)

### 7. Three.js (transitions images projets)
```html
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62dbe5375ca4e2e927f78_three-bundle.txt"></script>
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62e295375ca5dfd927fc8_demo-core.txt"></script>
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62e29952a223c080279af_demo.txt"></script>
```
→ Puis le script d'initialisation Three.js (voir `candigo.html` pour le script complet)

---

## 8. Classes d'Animation

| Classe       | Comportement                                     | Trigger                 |
|-------------|--------------------------------------------------|-------------------------|
| `.fade-up`  | Montée de 200px + fade in                        | `#heading-container`    |
| `.fade-up2` | Montée de 100px + fade in                        | `#heading-container2`   |
| `.fade-up3` | Montée de 100px + fade in                        | `#heading-container3`   |
| `.fade-up4` | Montée de 100px + fade in (section "next")       | `#heading-container4`   |
| `.slide-up` | Slide vers le haut                                | scroll inview           |
| `.slide-in` | Slide latéral                                    | scroll inview           |
| `.rotate-in`| Rotation + apparition                             | scroll inview           |
| `.pop-in`   | Scale pop + apparition                            | scroll inview           |
| `.tricks`   | **Obligatoire** pour l'animation lettre par lettre | combiné avec fade-up   |

---

## 9. Checklist – Nouvelle Page Projet

- [ ] Copier `candigo.html` comme template
- [ ] Changer le `<title>` dans le head
- [ ] Changer les meta descriptions (og:title, og:description, og:image)
- [ ] Mettre à jour les infos du hero (client, role, year)
- [ ] Changer le contenu des sections (titre, description, images)
- [ ] Ajouter les images du projet dans `images/`
- [ ] Créer la classe CSS `.bg-image-wrapper.[nom-projet]` dans le style
- [ ] Mettre à jour le lien "next project"
- [ ] Ajouter le projet dans la liste de `index.html`
- [ ] Vérifier que tous les liens pointent vers les bonnes pages locales
- [ ] Tester les animations au scroll
- [ ] Vérifier le grain overlay et le custom cursor

---

## 10. Bonnes Pratiques

1. **Toujours** utiliser la police Lato (chargée via Google Fonts)
2. **Toujours** inclure `.tricks` sur les éléments avec animations de texte
3. **Ne jamais** modifier l'ordre des scripts
4. **Toujours** utiliser les classes Webflow existantes avant de créer du CSS custom
5. Images optimisées : JPG pour photos, PNG pour illustrations
6. Utiliser `loading="lazy"` sur toutes les images sauf le hero
7. Les liens sociaux pointent vers les vrais profils d'Adam El Hirch
8. Le fichier de référence complet pour une page projet est `candigo.html`

---

## 11. Informations de Contact

- **Nom** : Adam El Hirch
- **Email** : contact@adamelhirch.com
- **GitHub** : https://github.com/adamelhirch
- **LinkedIn** : https://www.linkedin.com/in/adam-el-hirch
