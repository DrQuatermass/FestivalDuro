# Festival Duro - Sito ufficiale

Sito web responsivo e SEO-friendly del Festival Duro, festival di musica live.
Quarta edizione: 5 e 6 giugno 2026, Arena Wave Music, Modena.

Stack: Django 5, template HTML e CSS custom con palette gialla e nera.

## Cartelle principali

La cartella di lavoro e':

```text
C:\FestivalDuro\festival_duro
```

La struttura superiore e' organizzata cosi':

```text
C:\FestivalDuro
|-- festival_duro\        # progetto Django
|-- assets-originali\     # loghi, video e grafiche sorgenti
`-- archivio\             # vecchio scheletro, backup, log e verifiche
```

## Struttura progetto

```text
festival_duro/
|-- manage.py
|-- requirements.txt
|-- .env.example
|-- config/
|   |-- settings/         # base.py, dev.py, prod.py
|   |-- urls.py
|   |-- wsgi.py
|   `-- asgi.py
|-- apps/
|   `-- core/             # modelli, views, admin
|-- templates/            # base.html, core/*.html, robots.txt
|-- static/
|   |-- css/main.css
|   |-- js/main.js
|   `-- img/
`-- media/                # upload locali, esclusi da Git
```

## Requisiti

- Python 3.10+
- Django 5.2+

La `.venv` locale del progetto e' gia' nella cartella `festival_duro`.

## Setup locale

Da PowerShell:

```powershell
cd "C:\FestivalDuro\festival_duro"
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_festival
.\.venv\Scripts\python.exe manage.py createsuperuser
.\.venv\Scripts\python.exe manage.py runserver
```

Apri:

```text
http://127.0.0.1:8000/
```

## Modelli principali

- Edizione: numero, date, venue, locandina, link biglietti. Solo una edizione puo' essere corrente.
- Venue: location del festival, indirizzo e link Google Maps.
- Band: artisti in line-up, collegati a una edizione, con flag headliner.
- FAQ: domande frequenti per la pagina Info.

## Pagine

| URL                | View           | Scopo                    |
|--------------------|----------------|--------------------------|
| `/`                | HomeView       | Hero, headliner, intro   |
| `/line-up/`        | LineUpView     | Griglia band             |
| `/line-up/<slug>/` | BandDetailView | Pagina singola band      |
| `/info/`           | InfoView       | Venue, date, FAQ         |
| `/admin/`          | Django Admin   | Gestione contenuti       |
| `/sitemap.xml`     | sitemap        | SEO                      |
| `/robots.txt`      | template       | SEO                      |

## Produzione VPS

Deploy attuale: Apache2 come reverse proxy, Gunicorn come application server,
PostgreSQL come database.

Dominio principale:

```text
https://festivalduro.it
https://www.festivalduro.it
```

Percorso sulla VPS:

```text
/var/www/festivalduro
```

Gunicorn ascolta solo in locale:

```text
127.0.0.1:8001
```

Apache pubblica il sito tramite:

```text
/etc/apache2/sites-available/festivalduro.conf
/etc/apache2/sites-available/festivalduro-le-ssl.conf
```

Servizio systemd:

```text
/etc/systemd/system/festivalduro.service
```

## Variabili ambiente

Il file `.env` di produzione vive sulla VPS e non e' tracciato da Git:

```text
/var/www/festivalduro/.env
```

Esempio:

```env
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=festivalduro.it,www.festivalduro.it
DATABASE_URL=postgres://festival_duro_user:password@localhost:5432/festival_duro
DATABASE_SSL_REQUIRE=False
SITE_DOMAIN=festivalduro.it

SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=3600
SECURE_HSTS_INCLUDE_SUBDOMAINS=False
SECURE_HSTS_PRELOAD=False

GOOGLE_ANALYTICS_ID=G-0QVZN4HZWX
GOOGLE_SITE_VERIFICATION=
ENABLE_ANALYTICS=True
```

`GOOGLE_SITE_VERIFICATION` deve contenere solo il valore del `content` del meta
tag fornito da Google Search Console.

## Apache

HTTP deve fare solo redirect a HTTPS:

```apache
<VirtualHost *:80>
    ServerName festivalduro.it
    ServerAlias www.festivalduro.it

    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
</VirtualHost>
```

HTTPS deve fare proxy verso Gunicorn:

```apache
<VirtualHost *:443>
    ServerName festivalduro.it
    ServerAlias www.festivalduro.it

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"

    Alias /static/ /var/www/festivalduro/staticfiles/
    <Directory /var/www/festivalduro/staticfiles>
        Require all granted
    </Directory>

    Alias /media/ /var/www/festivalduro/media/
    <Directory /var/www/festivalduro/media>
        Require all granted
    </Directory>

    ProxyPass /static/ !
    ProxyPass /media/ !
    ProxyPass / http://127.0.0.1:8001/
    ProxyPassReverse / http://127.0.0.1:8001/
</VirtualHost>
```

Moduli Apache richiesti:

```bash
sudo a2enmod proxy proxy_http headers rewrite ssl
```

## Gunicorn systemd

Configurazione del servizio:

```ini
[Unit]
Description=Festival Duro Django Gunicorn
After=network.target postgresql.service

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/festivalduro
Environment="HOME=/var/www/festivalduro"
Environment="DJANGO_SETTINGS_MODULE=config.settings.prod"
EnvironmentFile=/var/www/festivalduro/.env
ExecStart=/var/www/festivalduro/.venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8001 \
          config.wsgi:application

Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

Directory di controllo Gunicorn:

```bash
sudo mkdir -p /var/www/festivalduro/.gunicorn
sudo chown -R www-data:www-data /var/www/festivalduro/.gunicorn
```

## Aggiornare produzione

Quando ci sono nuovi commit su GitHub:

```bash
cd /var/www/festivalduro
sudo -u www-data git pull
sudo -u www-data /var/www/festivalduro/.venv/bin/pip install -r requirements.txt
sudo -u www-data DJANGO_SETTINGS_MODULE=config.settings.prod /var/www/festivalduro/.venv/bin/python manage.py migrate
sudo -u www-data DJANGO_SETTINGS_MODULE=config.settings.prod /var/www/festivalduro/.venv/bin/python manage.py collectstatic --noinput
sudo systemctl restart festivalduro
sudo systemctl reload apache2
```

## Diagnostica produzione

Stato applicazione:

```bash
sudo systemctl status festivalduro
sudo journalctl -u festivalduro -n 100 --no-pager
```

Apache:

```bash
sudo apache2ctl configtest
sudo apache2ctl -S
sudo tail -n 100 /var/log/apache2/festivalduro_error.log
```

HTTP/HTTPS:

```bash
curl -I http://festivalduro.it
curl -I https://festivalduro.it
curl -I https://www.festivalduro.it
```

Risultato atteso:

```text
http://festivalduro.it       -> 301 verso HTTPS
https://festivalduro.it      -> 200 OK
https://www.festivalduro.it  -> 200 OK
```

Verifica Analytics/Search Console:

```bash
curl -s https://festivalduro.it | grep -E "googletagmanager|google-site-verification"
```

## Backup

```bash
sudo -u postgres pg_dump festival_duro > /root/festival_duro_$(date +%F).sql
tar -czf /root/festival_duro_media_$(date +%F).tar.gz /var/www/festivalduro/media
```

## Note grafiche

- Giallo: `#FFD400`
- Nero: `#0A0A0A`
- Avorio: `#F5F1E6`

Font: Bungee Inline, Rubik Mono One e Inter.
