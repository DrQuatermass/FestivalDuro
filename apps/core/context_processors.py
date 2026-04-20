"""Context processor per esporre dati globali ai template."""
from django.conf import settings

from .models import Edizione


def site_context(request):
    """Espone l'edizione corrente e info sito a tutti i template."""
    edizione = Edizione.objects.filter(is_corrente=True).first()
    return {
        "site_name": getattr(settings, "SITE_NAME", "Festival Duro"),
        "site_tagline": getattr(settings, "SITE_TAGLINE", ""),
        "site_domain": getattr(settings, "SITE_DOMAIN", ""),
        "google_analytics_id": getattr(settings, "GOOGLE_ANALYTICS_ID", ""),
        "google_site_verification": getattr(
            settings, "GOOGLE_SITE_VERIFICATION", ""
        ),
        "enable_analytics": getattr(settings, "ENABLE_ANALYTICS", False),
        "edizione_corrente": edizione,
        "seo_default_description": getattr(
            settings, "SEO_DEFAULT_DESCRIPTION", ""
        ),
        "seo_default_keywords": getattr(settings, "SEO_DEFAULT_KEYWORDS", ""),
    }
