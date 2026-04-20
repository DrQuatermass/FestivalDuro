"""Views del sito Festival Duro."""
from django.shortcuts import get_object_or_404, render
from django.views.generic import DetailView, ListView, TemplateView

from .models import Band, Edizione, FAQ, Venue


class HomeView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        edizione = Edizione.objects.filter(is_corrente=True).first()
        ctx["edizione"] = edizione
        ctx["headliners"] = (
            Band.objects.filter(edizione=edizione, headliner=True)
            if edizione
            else Band.objects.none()
        )
        ctx["page_title"] = "Festival Duro - 5 e 6 Giugno 2026 - Modena"
        ctx["meta_description"] = (
            "Festival Duro, due giorni di musica live ad alta intensità "
            "all'Arena Wave Music di Modena. 5-6 giugno 2026. Scopri la line-up."
        )
        return ctx


class LineUpView(ListView):
    template_name = "core/lineup.html"
    context_object_name = "band_list"

    def get_queryset(self):
        edizione = Edizione.objects.filter(is_corrente=True).first()
        if not edizione:
            return Band.objects.none()
        return Band.objects.filter(edizione=edizione)

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["edizione"] = Edizione.objects.filter(is_corrente=True).first()
        ctx["page_title"] = "Line-up - Festival Duro"
        ctx["meta_description"] = (
            "Tutti gli artisti e le band sul palco di Festival Duro 2026."
        )
        return ctx


class BandDetailView(DetailView):
    model = Band
    template_name = "core/band_detail.html"
    context_object_name = "band"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["page_title"] = f"{self.object.nome} - Festival Duro"
        ctx["meta_description"] = (
            f"{self.object.nome} sul palco di Festival Duro 2026. "
            f"Scopri la band e gli orari del live."
        )
        return ctx


class InfoView(TemplateView):
    template_name = "core/info.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        edizione = Edizione.objects.filter(is_corrente=True).first()
        ctx["edizione"] = edizione
        ctx["venue"] = edizione.venue if edizione else Venue.objects.first()
        ctx["faq_list"] = FAQ.objects.filter(pubblicata=True)
        ctx["page_title"] = "Info & Venue - Festival Duro"
        ctx["meta_description"] = (
            "Tutte le info utili per Festival Duro: location, come arrivare, "
            "orari, FAQ. Arena Wave Music, Modena."
        )
        return ctx


class PrivacyView(TemplateView):
    template_name = "core/privacy.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["page_title"] = "Privacy Policy - Festival Duro"
        ctx["meta_description"] = (
            "Informativa sulla privacy e trattamento dei dati personali "
            "di Festival Duro, ai sensi del GDPR (Regolamento UE 2016/679)."
        )
        return ctx


class CookiePolicyView(TemplateView):
    template_name = "core/cookie_policy.html"

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx["page_title"] = "Cookie Policy - Festival Duro"
        ctx["meta_description"] = (
            "Informativa sui cookie utilizzati dal sito di Festival Duro."
        )
        return ctx
