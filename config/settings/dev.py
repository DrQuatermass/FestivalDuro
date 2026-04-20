"""Settings per ambiente di sviluppo (SQLite)."""
from .base import *  # noqa: F401,F403
from .base import BASE_DIR

DEBUG = True
ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Email su console in dev
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
