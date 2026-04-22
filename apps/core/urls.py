"""URL dell'app core."""
from django.urls import path

from . import views

app_name = "core"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("line-up/", views.LineUpView.as_view(), name="lineup"),
    path("line-up/<slug:slug>/", views.BandDetailView.as_view(), name="band_detail"),
    path("edizioni/", views.PastEditionsView.as_view(), name="past_editions"),
    path("in-memoria-di-oleg/", views.MemorialView.as_view(), name="memorial"),
    path("info/", views.InfoView.as_view(), name="info"),
    path("privacy/", views.PrivacyView.as_view(), name="privacy"),
    path("cookie-policy/", views.CookiePolicyView.as_view(), name="cookie_policy"),
]
