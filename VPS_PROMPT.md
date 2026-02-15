Tu es un agent DevOps sur un VPS Ubuntu 22.04/24.04.
Objectif: déployer en production le portfolio statique sur `adamelhirch.com` (DNS déjà pointé), avec HTTPS, config Nginx propre et déploiement reproductible.

Contexte application
- Site statique multi-pages (pas de build).
- Fichiers clés à servir: `index.html`, `about.html`, `candigo.html`, `yelp-analytics.html`, `seriesflix.html`, `nutrisight.html`, `style.css`, `index.js`, `vendor/`, `images/`.
- Le header "Contact" des pages pointe vers `index.html#contact`.
- Le CV est servi via `El HIRCH ADAM CV.pdf`.

Contraintes
- Ne pas poser de questions si une hypothèse raisonnable existe.
- Exécuter des commandes idempotentes.
- Afficher les commandes exécutées et les résultats utiles.
- Installer automatiquement les prérequis manquants.
- En cas d'erreur, corriger et continuer.

Hypothèses de travail
- Le dépôt est déjà cloné sur le VPS.
- Le répertoire courant (`$PWD`) est la racine du dépôt.
- Domaine principal: `adamelhirch.com`.
- Email TLS: `admin@adamelhirch.com`.

Plan d'action attendu
1. Préchecks système:
   - Vérifier OS, utilisateur, sudo.
   - Vérifier que `index.html` existe dans le dossier courant.
2. Installer/mettre à jour paquets:
   - `nginx`, `certbot`, `python3-certbot-nginx`, `rsync`, `curl`.
3. Préparer dossiers:
   - `WEB_ROOT=/var/www/adamelhirch.com/current`
   - créer les dossiers nécessaires.
4. Déployer les fichiers statiques avec synchronisation propre:
   - `rsync -a --delete` depuis le repo vers `$WEB_ROOT`
   - exclure au minimum: `.git/`, `.claude/`, `.DS_Store`, `**/.DS_Store`, `*.log`
5. Configurer Nginx:
   - fichier: `/etc/nginx/sites-available/adamelhirch.com`
   - `server_name adamelhirch.com www.adamelhirch.com;`
   - racine: `/var/www/adamelhirch.com/current`
   - `index index.html;`
   - `location / { try_files $uri $uri/ =404; }`
   - gzip activé pour texte/css/js/svg/json
   - cache long pour assets statiques
6. Activer le site:
   - symlink dans `sites-enabled`
   - désactiver `default` si nécessaire
   - `nginx -t` puis reload
7. Activer HTTPS Let's Encrypt:
   - `certbot --nginx -d adamelhirch.com -d www.adamelhirch.com --redirect --non-interactive --agree-tos -m admin@adamelhirch.com`
8. Forcer `www -> root`:
   - garantir redirection 301 `https://www.adamelhirch.com/*` vers `https://adamelhirch.com/*`
9. Vérifier renouvellement:
   - `systemctl status certbot.timer`
   - `certbot renew --dry-run`
10. Vérifications fonctionnelles finales:
   - `curl -I http://adamelhirch.com` -> redirection vers HTTPS
   - `curl -I https://adamelhirch.com` -> `200`
   - `curl -I https://www.adamelhirch.com` -> redirection vers root
   - `curl -I https://adamelhirch.com/index.html` -> `200`
   - `curl -I https://adamelhirch.com/about.html` -> `200`
   - `curl -I https://adamelhirch.com/yelp-analytics.html` -> `200`
   - `curl -I https://adamelhirch.com/images/profile-photo.jpg` -> `200`
   - `curl -I "https://adamelhirch.com/El%20HIRCH%20ADAM%20CV.pdf"` -> `200`

Config Nginx cible (adapte uniquement si nécessaire)
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name adamelhirch.com www.adamelhirch.com;

    location /.well-known/acme-challenge/ {
        root /var/www/adamelhirch.com/current;
    }

    location / {
        return 301 https://adamelhirch.com$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.adamelhirch.com;

    ssl_certificate /etc/letsencrypt/live/adamelhirch.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/adamelhirch.com/privkey.pem;
    return 301 https://adamelhirch.com$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name adamelhirch.com;

    root /var/www/adamelhirch.com/current;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/adamelhirch.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/adamelhirch.com/privkey.pem;

    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(?:css|js|mjs|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        access_log off;
    }
}
```

Commande de redeploy attendue en sortie
- Fournir une commande unique de redeploy réutilisable, exemple:
  - `rsync -a --delete --exclude '.git/' --exclude '.claude/' --exclude '.DS_Store' ./ /var/www/adamelhirch.com/current/ && sudo nginx -t && sudo systemctl reload nginx`

Livrables finaux
- Résumé de config appliquée.
- Chemins exacts utilisés.
- Résultats des checks `curl -I`.
- Statut TLS/renouvellement.
- Commande de redeploy prête à copier-coller.
