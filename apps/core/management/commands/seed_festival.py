"""Popola il DB con i dati della 4ª edizione del Festival Duro."""
from datetime import date

from django.core.management.base import BaseCommand

from apps.core.models import Edizione, FAQ, Venue


class Command(BaseCommand):
    help = "Crea/aggiorna venue, edizione e FAQ della 4ª edizione (2026)."

    def handle(self, *args, **options):
        # Venue
        venue, _ = Venue.objects.update_or_create(
            nome="Arena Wave Music",
            defaults={
                "indirizzo": "Via Ancona 6",
                "citta": "Modena",
                "provincia": "MO",
                "cap": "41122",
                "google_maps_url": "https://maps.google.com/?q=Arena+Wave+Music+Via+Ancona+6+Modena",
                "descrizione": "Arena live nel cuore della provincia modenese.",
            },
        )
        self.stdout.write(self.style.SUCCESS(f"Venue: {venue}"))

        # Edizione 4
        edizione, created = Edizione.objects.update_or_create(
            numero=4,
            defaults={
                "titolo": "Festival Duro - 4ª Edizione",
                "data_inizio": date(2026, 6, 5),
                "data_fine": date(2026, 6, 6),
                "venue": venue,
                "descrizione": (
                    "Due serate imperdibili di musica live: "
                    "venerdì 5 e sabato 6 giugno 2026."
                ),
                "is_corrente": True,
            },
        )
        self.stdout.write(
            self.style.SUCCESS(
                f"{'Creata' if created else 'Aggiornata'} edizione: {edizione}"
            )
        )

        # FAQ
        faqs = [
            {
                "domanda": "Quando si svolge il Festival Duro 2026?",
                "risposta": "Venerdì 5 e sabato 6 giugno 2026.",
                "ordine": 10,
            },
            {
                "domanda": "Dove si tiene il festival?",
                "risposta": "All'Arena Wave Music, Via Ancona 6, Modena.",
                "ordine": 20,
            },
            {
                "domanda": "Come acquisto i biglietti?",
                "risposta": (
                    "I biglietti saranno disponibili nelle prossime settimane. "
                    "Resta connesso sui nostri canali social per tutti gli aggiornamenti."
                ),
                "ordine": 30,
            },
            {
                "domanda": "Il festival è all'aperto?",
                "risposta": "Sì, l'Arena Wave Music è una location live all'aperto.",
                "ordine": 40,
            },
            {
                "domanda": "C'è un'area food & drink?",
                "risposta": "Sì, all'interno dell'arena trovi area ristoro e bar.",
                "ordine": 50,
            },
        ]
        for f in faqs:
            FAQ.objects.update_or_create(
                domanda=f["domanda"],
                defaults={
                    "risposta": f["risposta"],
                    "ordine": f["ordine"],
                    "pubblicata": True,
                },
            )
        self.stdout.write(self.style.SUCCESS(f"FAQ inserite: {len(faqs)}"))

        self.stdout.write(self.style.SUCCESS("Seed completato."))
