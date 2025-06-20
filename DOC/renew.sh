# delete certs
sudo certbot delete --cert-name pcoundia.com


sudo certbot --nginx \
  -d pcoundia.com -d www.pcoundia.com \
  --agree-tos --non-interactive -m admin@pcoundia.com


sudo nano /etc/nginx/sites-available/pcoundia.com