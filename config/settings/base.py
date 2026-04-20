"""
Settings comuni per Festival Duro.
"""
from pathlib import Path
from decouple import config, Csv

# BASE_DIR = .../festival_duro/
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config("DJANGO_SECRET_KEY", default="dev-insecure-secret-change-me")

DEBUG = config("DJANGO_DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = config(
    "DJANGO_ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=Csv(),
)

SITE_DOMAIN = config("SITE_DOMAIN", default="localhost:8000")
SITE_NAME = "Festival Duro"
SITE_TAGLINE = "Hard Rock. Harder Cock."
GOOGLE_ANALYTICS_ID = config("GOOGLE_ANALYTICS_ID", default="")
GOOGLE_SITE_VERIFICATION = config("GOOGLE_SITE_VERIFICATION", default="")
ENABLE_ANALYTICS = config("ENABLE_ANALYTICS", default=not DEBUG, cast=bool)

# Application definition
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
]

LOCAL_APPS = [
    "apps.core",
]

INSTALLED_APPS = DJANGO_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "apps.core.context_processors.site_context",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Internationalization
LANGUAGE_CODE = "it-it"
TIME_ZONE = "Europe/Rome"
USE_I18N = True
USE_TZ = True

# Static & Media
STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# SEO defaults
SEO_DEFAULT_DESCRIPTION = (
    "Festival Duro: due serate di musica live ad alta intensità. "
    "5 e 6 giugno 2026 all'Arena Wave Music di Modena."
)
SEO_DEFAULT_KEYWORDS = (
    "festival duro, festival musica modena, concerti live modena, "
    "rock live, arena wave music, giugno 2026"
)
