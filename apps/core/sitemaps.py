"""Sitemap per SEO."""
from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import Band


class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"

    def items(self):
        return ["core:home", "core:lineup", "core:past_editions", "core:info"]

    def location(self, item):
        return reverse(item)


class BandSitemap(Sitemap):
    priority = 0.6
    changefreq = "monthly"

    def items(self):
        return Band.objects.filter(visibile=True)

    def location(self, obj):
        return obj.get_absolute_url()
