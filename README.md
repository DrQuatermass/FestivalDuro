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

## Produzione

`config/settings/prod.py` include:

- `DATABASE_URL` via `dj-database-url`
- HSTS, SSL redirect e cookie sicuri
- WhiteNoise per servire static
- `DEBUG=False`

Comandi tipici:

```bash
DJANGO_SETTINGS_MODULE=config.settings.prod python manage.py collectstatic
gunicorn config.wsgi:application
```

## Note grafiche

- Giallo: `#FFD400`
- Nero: `#0A0A0A`
- Avorio: `#F5F1E6`

Font: Bungee Inline, Rubik Mono One e Inter.
