Tu es un agent DevOps sur un VPS Ubuntu 22.04/24.04. Configure et déploie un site statique pour le domaine `adamelhirch.com` (déjà pointé DNS vers ce VPS).

Objectif
- Servir le portfolio statique en production via Nginx.
- Activer HTTPS Let's Encrypt.
- Mettre en place redirection HTTP->HTTPS et `www` -> domaine racine.
- Configurer cache et compression adaptés à des assets statiques.
- Rendre le déploiement reproductible.

Contraintes
- Ne pas poser de questions tant qu'une hypothèse raisonnable existe.
- Exécuter des commandes idempotentes.
- Afficher les commandes lancées + le résultat utile.
- Si un prérequis manque, l'installer automatiquement.

Plan d'action attendu
1. Vérifier OS + accès root/sudo.
2. Installer/mettre à jour paquets requis: `nginx`, `certbot`, `python3-certbot-nginx`, `rsync`.
3. Préparer le dossier web:
   - Racine: `/var/www/adamelhirch.com/current`
   - Créer le dossier si absent.
4. Déployer les fichiers du portfolio dans cette racine (synchronisation propre), en excluant au minimum:
   - `.git/`, `.claude/`, `.DS_Store`, `**/.DS_Store`
5. Créer la config Nginx `/etc/nginx/sites-available/adamelhirch.com` avec:
   - `server_name adamelhirch.com www.adamelhirch.com;`
   - `root /var/www/adamelhirch.com/current;`
   - `index index.html;`
   - `location / { try_files $uri $uri/ =404; }`
   - cache long pour assets versionnés (`css|js|png|jpg|jpeg|gif|svg|webp|woff|woff2`).
   - `gzip on` pour textes/css/js/svg/json.
6. Activer le site:
   - symlink dans `sites-enabled`
   - désactiver `default` si actif
   - `nginx -t` puis reload.
7. Générer certificat TLS:
   - `certbot --nginx -d adamelhirch.com -d www.adamelhirch.com --redirect --non-interactive --agree-tos -m admin@adamelhirch.com`
8. Forcer redirection `www` vers racine (301) si certbot ne l'a pas fait.
9. Vérifier renouvellement auto:
   - `systemctl status certbot.timer`
   - `certbot renew --dry-run`
10. Vérifications finales:
   - `curl -I http://adamelhirch.com` -> 301/308 vers https
   - `curl -I https://adamelhirch.com` -> 200
   - `curl -I https://www.adamelhirch.com` -> redirection vers https://adamelhirch.com
   - confirmer que `index.html`, `images/`, `vendor/`, `style.css`, `index.js` sont accessibles.

Config Nginx cible (adapte uniquement si nécessaire)
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name adamelhirch.com www.adamelhirch.com;

    location /.well-known/acme-challenge/ { root /var/www/adamelhirch.com/current; }
    location / { return 301 https://adamelhirch.com$request_uri; }
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

Livrables en sortie
- Résumé clair de ce qui a été configuré.
- Chemins exacts utilisés.
- Résultat des checks `curl -I`.
- Commande de déploiement à relancer pour les prochaines mises à jour (ex: `rsync ... && systemctl reload nginx`).
