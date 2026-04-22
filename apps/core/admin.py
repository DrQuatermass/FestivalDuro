"""Configurazione dell'admin di Festival Duro."""
from django.contrib import admin

from .models import Band, Edizione, FAQ, Venue

admin.site.site_header = "Festival Duro - Admin"
admin.site.site_title = "Festival Duro"
admin.site.index_title = "Gestione del festival"


class BandInline(admin.TabularInline):
    model = Band
    extra = 0
    fields = ("nome", "visibile", "headliner", "giorno", "orario", "ordine")
    show_change_link = True


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ("nome", "citta", "provincia")
    search_fields = ("nome", "citta")


@admin.register(Edizione)
class EdizioneAdmin(admin.ModelAdmin):
    list_display = ("numero", "data_inizio", "data_fine", "venue", "is_corrente")
    list_filter = ("is_corrente",)
    search_fields = ("numero", "titolo")
    inlines = [BandInline]
    fieldsets = (
        (None, {"fields": ("numero", "titolo", "is_corrente")}),
        ("Date e location", {"fields": ("data_inizio", "data_fine", "venue")}),
        ("Contenuti", {"fields": ("descrizione", "locandina", "biglietti_url")}),
    )


@admin.register(Band)
class BandAdmin(admin.ModelAdmin):
    list_display = (
        "nome",
        "edizione",
        "giorno",
        "orario",
        "visibile",
        "headliner",
        "ordine",
    )
    list_filter = ("edizione", "visibile", "headliner", "giorno")
    search_fields = ("nome",)
    prepopulated_fields = {"slug": ("nome",)}
    list_editable = ("visibile", "headliner", "ordine")
    fieldsets = (
        (
            None,
            {"fields": ("nome", "slug", "edizione", "visibile", "headliner", "ordine")},
        ),
        ("Performance", {"fields": ("giorno", "orario")}),
        ("Contenuti", {"fields": ("bio", "foto")}),
        ("Link", {"fields": ("sito_web", "instagram", "spotify", "youtube")}),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("domanda", "ordine", "pubblicata")
    list_editable = ("ordine", "pubblicata")
    search_fields = ("domanda", "risposta")
