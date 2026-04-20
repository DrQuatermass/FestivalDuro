"""Modelli del sito Festival Duro."""
from django.db import models
from django.urls import reverse
from django.utils.text import slugify


class Venue(models.Model):
    """Location del festival."""

    nome = models.CharField(max_length=120)
    indirizzo = models.CharField(max_length=200)
    citta = models.CharField("Città", max_length=80)
    provincia = models.CharField(max_length=2, blank=True)
    cap = models.CharField("CAP", max_length=10, blank=True)
    lat = models.DecimalField(
        "Latitudine", max_digits=9, decimal_places=6, null=True, blank=True
    )
    lng = models.DecimalField(
        "Longitudine", max_digits=9, decimal_places=6, null=True, blank=True
    )
    google_maps_url = models.URLField(blank=True)
    descrizione = models.TextField(blank=True)

    class Meta:
        verbose_name = "Venue"
        verbose_name_plural = "Venue"
        ordering = ["nome"]

    def __str__(self) -> str:
        return f"{self.nome} - {self.citta}"


class Edizione(models.Model):
    """Edizione del Festival Duro (es. 4ª ed. 2026)."""

    numero = models.PositiveIntegerField("Numero edizione", unique=True)
    titolo = models.CharField(max_length=120, blank=True)
    data_inizio = models.DateField()
    data_fine = models.DateField()
    venue = models.ForeignKey(
        Venue, on_delete=models.PROTECT, related_name="edizioni"
    )
    descrizione = models.TextField(blank=True)
    locandina = models.ImageField(upload_to="edizioni/", blank=True, null=True)
    is_corrente = models.BooleanField(
        "Edizione corrente", default=False,
        help_text="Solo una edizione può essere quella corrente.",
    )
    biglietti_url = models.URLField("URL biglietti", blank=True)

    class Meta:
        verbose_name = "Edizione"
        verbose_name_plural = "Edizioni"
        ordering = ["-numero"]

    def __str__(self) -> str:
        return f"{self.numero}ª Edizione - {self.data_inizio.year}"

    def save(self, *args, **kwargs):
        # Garantisce che ci sia una sola edizione corrente
        if self.is_corrente:
            Edizione.objects.exclude(pk=self.pk).update(is_corrente=False)
        super().save(*args, **kwargs)


class Band(models.Model):
    """Band o artista in line-up."""

    nome = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, max_length=140, blank=True)
    bio = models.TextField(blank=True)
    foto = models.ImageField(upload_to="band/", blank=True, null=True)
    sito_web = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    spotify = models.URLField(blank=True)
    youtube = models.URLField(blank=True)

    edizione = models.ForeignKey(
        Edizione,
        on_delete=models.CASCADE,
        related_name="band",
    )
    giorno = models.DateField(null=True, blank=True)
    orario = models.TimeField(null=True, blank=True)
    headliner = models.BooleanField(default=False)
    ordine = models.PositiveIntegerField(
        default=0, help_text="Ordine di visualizzazione in line-up"
    )

    class Meta:
        verbose_name = "Band"
        verbose_name_plural = "Band"
        ordering = ["-headliner", "ordine", "nome"]

    def __str__(self) -> str:
        return self.nome

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)

    def get_absolute_url(self) -> str:
        return reverse("core:band_detail", kwargs={"slug": self.slug})


class FAQ(models.Model):
    """Domande frequenti per la pagina Info."""

    domanda = models.CharField(max_length=200)
    risposta = models.TextField()
    ordine = models.PositiveIntegerField(default=0)
    pubblicata = models.BooleanField(default=True)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"
        ordering = ["ordine", "domanda"]

    def __str__(self) -> str:
        return self.domanda
