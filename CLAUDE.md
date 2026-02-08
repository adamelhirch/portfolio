# Portfolio Project Pages - Style Guide

Ce document définit la structure et le style pour créer des pages de projet dans le portfolio d'Adam El Hirch, basé sur le design de Nicolas Fol.

## Structure HTML de Base

Chaque page de projet doit suivre cette structure:

```html
<!DOCTYPE html>
<html data-wf-domain="nicolasfol.webflow.io" data-wf-page="62ac97cbea112f255f60c7b1"
      data-wf-site="600be19268d1cb46eb5169bf" data-wf-status="1"
      class="w-mod-js w-mod-ix wf-lato-n1-active wf-lato-i1-active wf-lato-n3-active wf-lato-i3-active wf-lato-n4-active wf-lato-i4-active wf-lato-n7-active wf-lato-i7-active wf-lato-n9-active wf-lato-i9-active wf-active">
```

## Head - CSS et Fonts

### CSS Requis
```html
<link href="https://cdn.prod.website-files.com/600be19268d1cb46eb5169bf/css/nicolasfol.webflow.eb2603306.css" rel="stylesheet" type="text/css">
```

### Font Lato (Google Fonts)
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic" media="all">
<script type="text/javascript">
WebFont.load({
  google: {
    families: ["Lato:100,100italic,300,300italic,400,400italic,700,700italic,900,900italic"]
  }
});
</script>
```

## Navigation

La navigation utilise les classes suivantes:
- `.navigation` - Conteneur principal
- `.menu-wrapper` - Bouton menu hamburger
- `.titel-wrap` - Logo/nom (doit pointer vers `index.html`)
- `.nav-menu` - Menu déroulant
- `.social-wrapper` - Liens sociaux (GitHub, LinkedIn, etc.)

**Important**: Tous les liens internes doivent pointer vers `index.html` ou les autres pages du portfolio, PAS vers nicolasfol.webflow.io.

## Hero Section

### Structure
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
  <div class="bg-image-wrapper"></div>
</div>
```

### Image de fond Hero
Ajouter dans `style.css`:
```css
.bg-image-wrapper.nom-projet {
  background-image: url('chemin/vers/image.jpg');
}
```

Puis ajouter la classe au div: `<div class="bg-image-wrapper nom-projet"></div>`

## Sections de Contenu

### Section Titre + Description (style simple)
```html
<div class="section project">
  <div class="wrapper flex">
    <div id="heading-container" class="wrap h4">
      <h4 class="fade-up tricks">Titre du projet</h4>
      <h4 class="fade-up tricks">Description courte</h4>
      <h4 class="fade-up tricks">ligne 3</h4>
    </div>
    <div id="heading-container2" class="wrap project">
      <div class="text-block project">
        Description longue du projet...
      </div>
    </div>
  </div>
</div>
```

### Section avec titre aligné à gauche (style projects _2)
```html
<div class="section project">
  <div class="wrapper flex projects _2">
    <div class="wrap h4">
      <h4 class="fade-up tricks">The Problem</h4>
    </div>
    <div class="wrap project">
      <div class="text-block project">
        Texte du problème...
      </div>
    </div>
  </div>
</div>
```

### Section Images
```html
<div class="section project img">
  <div class="w-layout-grid project-img-grid">
    <img src="url-image.jpg" loading="lazy" alt="Description" class="basic-img" />
  </div>
</div>
```

## Section "Next Project"

```html
<div data-w-id="Section 2" class="section next">
  <div class="list-wrapper next-project">
    <div class="btm-line"></div>
  </div>
  <div id="app" class="app"></div>
  <main class="main-copy">
    <h2 id="heading-container4" class="fade-up4 tricks">next<br></h2>
    <div id="itemsWrapper" class="grid project">
      <a href="nom-projet-suivant.html" class="grid-item item-1-copy w-inline-block">
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
        <a href="nom-projet-suivant.html" class="link">View Project</a>
      </div>
      <a href="#" class="fullview__close w-button">CLOSE</a>
    </div>
  </main>
</div>
```

## Footer

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

## Scripts Requis (fin de body)

### Dans cet ordre exact:

1. **jQuery**
```html
<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=600be19268d1cb46eb5169bf" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
```

2. **Webflow**
```html
<script src="https://cdn.prod.website-files.com/600be19268d1cb46eb5169bf/js/webflow.e34f84b99bfc9a211b7f79a8633e7240.js" type="text/javascript"></script>
```

3. **Grained.js** (effet grain animé)
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

4. **Custom Cursor**
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

5. **Delayed Navigation**
```html
<script>
  $('a.link, a.grid-item, a.nav-link, a.titel').click(function (e) {
    e.preventDefault();
    var goTo = this.getAttribute("href");
    setTimeout(function(){
         window.location = goTo;
  },2000);
  });
</script>
```

6. **Anime.js** (animations texte)
```html
<style>.letter {display: inline-block;} .tricksword {white-space: nowrap;}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/protonet-jquery.inview/1.1.2/jquery.inview.min.js"></script>
```

Puis le script d'initialisation anime.js complet (voir candigo.html lignes 158-421)

7. **Three.js** (transitions images)
```html
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62dbe5375ca4e2e927f78_three-bundle.txt"></script>
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62e295375ca5dfd927fc8_demo-core.txt"></script>
<script src="https://cdn.prod.website-files.com/5ce62dab952a22dd060278e3/5ce62e29952a223c080279af_demo.txt"></script>
```

Puis le script d'initialisation Three.js (voir candigo.html lignes 429-543)

## Classes d'Animation

### Classes disponibles:
- `.fade-up` - Animation de bas en haut au scroll (200px initial)
- `.fade-up2` - Animation de bas en haut au scroll (100px initial)
- `.fade-up3` - Animation de bas en haut au scroll (100px initial)
- `.fade-up4` - Animation de bas en haut au scroll (100px initial) - pour "next"
- `.slide-up` - Animation slide
- `.slide-in` - Animation slide
- `.rotate-in` - Animation rotation
- `.pop-in` - Animation pop/scale

### Utilisation:
```html
<h4 class="fade-up tricks">Texte animé</h4>
```

La classe `.tricks` est OBLIGATOIRE pour que l'animation lettre par lettre fonctionne.

## Éléments avec ID pour animations au scroll

Ces éléments déclenchent les animations quand ils deviennent visibles:
- `#heading-container` → déclenche `.fade-up`
- `#heading-container2` → déclenche `.fade-up2`
- `#heading-container3` → déclenche `.fade-up3`
- `#heading-container4` → déclenche `.fade-up4`

## Grain Overlay

Obligatoire dans chaque page:
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

## Custom Cursor

Obligatoire dans chaque page:
```html
<div class="html-cursor w-embed">
  <div class="cursor"></div>
</div>
```

## Lignes verticales décoratives

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

## Checklist pour une nouvelle page

- [ ] Copier candigo.html comme template
- [ ] Changer le `<title>` dans le head
- [ ] Changer les meta descriptions
- [ ] Mettre à jour les infos du hero (client, role, year)
- [ ] Changer le contenu des sections
- [ ] Ajouter les images du projet
- [ ] Créer la classe CSS pour l'image de fond hero dans style.css
- [ ] Mettre à jour le lien "next project"
- [ ] Vérifier que tous les liens pointent vers les bonnes pages
- [ ] Tester les animations au scroll
- [ ] Vérifier que le grain overlay fonctionne
- [ ] Tester le custom cursor

## Bonnes Pratiques

1. **Toujours** utiliser la police Lato (déjà chargée via Google Fonts)
2. **Toujours** inclure la classe `.tricks` sur les éléments avec animations de texte
3. **Ne jamais** modifier l'ordre des scripts
4. **Toujours** utiliser les classes Webflow existantes
5. **Ne jamais** créer de nouveau CSS custom si une classe Webflow existe
6. Les images doivent être optimisées (JPG pour photos, PNG pour illustrations)
7. Utiliser `loading="lazy"` sur toutes les images sauf celle du hero
8. Les liens sociaux doivent pointer vers les vrais profils d'Adam El Hirch

## Informations de Contact

- Email: contact@adamelhirch.com
- GitHub: https://github.com/adamelhirch
- LinkedIn: https://www.linkedin.com/in/adam-el-hirch

## Exemple Complet

Voir `candigo.html` comme référence complète d'une page de projet correctement structurée.
