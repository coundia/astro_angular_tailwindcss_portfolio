#!/bin/bash

# Configuration
DOMAIN="test.pcoundia.com"
PROJECT_DIR="/var/www/test.pcoundia.com"
GIT_REPO="git@github.com:coundia/astro_angular_tailwindcss_portfolio.git"

echo "🚀 Mise à jour des paquets..."
sudo apt update && sudo apt upgrade -y

echo "📦 Installation des dépendances..."
sudo apt install -y curl software-properties-common unzip git nginx certbot python3-certbot-nginx

echo "🛠️ Génération du certificat SSL avant la configuration de Nginx..."
sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@$DOMAIN

sudo rm /etc/nginx/sites-available/$DOMAIN
sudo rm /etc/nginx/sites-enabled/$DOMAIN

echo "🔧 Configuration de Nginx pour $DOMAIN..."
sudo bash -c "cat > /etc/nginx/sites-available/$DOMAIN <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name $DOMAIN www.$DOMAIN;
    root $PROJECT_DIR;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Gestion des routes Angular
    location / {
        index index.html;
        try_files \\\$uri \\\$uri \\\$uri/index.html /index.html;
    }

    error_log /var/log/nginx/$DOMAIN.error.log;
    access_log /var/log/nginx/$DOMAIN.access.log;
}
EOF"

sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
sudo systemctl restart nginx

echo "🔧 Configuration des permissions..."
sudo chown -R www-data:www-data $PROJECT_DIR
sudo chmod -R 775 $PROJECT_DIR

echo "🛠️ Vérification de la configuration Nginx..."
sudo nginx -t && sudo systemctl reload nginx

echo "✅ Déploiement terminé avec succès !"
echo "🌍 Accédez à https://$DOMAIN pour voir votre site."
