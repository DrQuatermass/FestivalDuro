"""Settings per produzione (Postgres + sicurezza)."""
import dj_database_url  # type: ignore  # opzionale, se non installato usa fallback
from decouple import config

from .base import *  # noqa: F401,F403

DEBUG = False

DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=config("DATABASE_SSL_REQUIRE", default=False, cast=bool),
    )
}

# Sicurezza
SECURE_SSL_REDIRECT = config("SECURE_SSL_REDIRECT", default=True, cast=bool)
SESSION_COOKIE_SECURE = config("SESSION_COOKIE_SECURE", default=True, cast=bool)
CSRF_COOKIE_SECURE = config("CSRF_COOKIE_SECURE", default=True, cast=bool)
SECURE_HSTS_SECONDS = config("SECURE_HSTS_SECONDS", default=3600, cast=int)
SECURE_HSTS_INCLUDE_SUBDOMAINS = config("SECURE_HSTS_INCLUDE_SUBDOMAINS", default=False, cast=bool)
SECURE_HSTS_PRELOAD = config("SECURE_HSTS_PRELOAD", default=False, cast=bool)
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = "strict-origin-when-cross-origin"
X_FRAME_OPTIONS = "DENY"
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
