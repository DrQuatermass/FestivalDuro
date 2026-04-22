const { useState: uS3 } = React;

/* Sample data — realistic placeholder copy, Italian */
const BANDS = [
  { id: "duri-del-rock", nome: "I Duri del Rock", headliner: true,  giorno: "Sabato 6 giugno", orario: "22:30", foto: "../../assets/poster-duro-4th-post.png",
    bio: "Hard rock modenese dal 2012. Quattro dischi, centinaia di live, una reputazione che parla da sé." },
  { id: "volumi-proibiti", nome: "Volumi Proibiti",  headliner: true,  giorno: "Venerdì 5 giugno", orario: "22:00", foto: "../../assets/poster-copertina-fb.png",
    bio: "Power trio emiliano. Riff pesanti, testi taglienti, nessun compromesso." },
  { id: "scarti-industriali", nome: "Scarti Industriali", headliner: false, giorno: "Venerdì 5 giugno", orario: "20:30", foto: "../../assets/hero-bg.jpg",
    bio: "Punk hardcore dal 2018. Origini: un capannone dismesso a Carpi." },
  { id: "ossidiana", nome: "Ossidiana", headliner: false, giorno: "Sabato 6 giugno", orario: "20:00", foto: "../../assets/poster-duro-4th-cop-ev.png",
    bio: "Stoner rock con anima doom. Chitarre in drop C e un basso che ti fa tremare lo sterno." },
  { id: "rotte-dritte", nome: "Rotte Dritte", headliner: false, giorno: "Sabato 6 giugno", orario: "21:00", foto: "../../assets/poster-comunicazioni.png",
    bio: "Garage rock carpigiano. Tre accordi e tanta attitudine." },
  { id: "kernvar", nome: "Kernvar", headliner: false, giorno: "Venerdì 5 giugno", orario: "21:15", foto: "../../assets/hero-bg-wide.jpg",
    bio: "Post-hardcore. Strutture lunghe, dinamiche violente, silenzi tesi." },
];

/* ============ PAGES ============ */
function HomePage({ onNav, onOpenBand }) {
  const headliners = BANDS.filter(b => b.headliner);
  return (
    <>
      <Hero onNav={onNav} />
      <section style={{ background: "var(--duro-black)", color: "var(--duro-bone)", padding: "clamp(4rem, 8vw, 6.75rem) 0" }}>
        <Container>
          <SectionTitle>Headliner</SectionTitle>
          <Grid>{headliners.map(b => <BandCard key={b.id} band={b} onOpen={onOpenBand}/>)}</Grid>
        </Container>
      </section>
      <section style={{ background: "#fff", padding: "clamp(4rem, 8vw, 6.75rem) 0" }}>
        <Container><FestivalPanel onCta={() => onNav("info")}/></Container>
      </section>
    </>
  );
}

function LineupPage({ onOpenBand }) {
  return (
    <>
      <PageHero kicker="Line-up 2026" title="Line-up"/>
      <section style={{ background: "#fff", padding: "clamp(4rem, 8vw, 6.75rem) 0" }}>
        <Container>
          <Grid>{BANDS.map(b => <BandCard key={b.id} band={b} onOpen={onOpenBand}/>)}</Grid>
        </Container>
      </section>
    </>
  );
}

function InfoPage() {
  return (
    <>
      <PageHero kicker="Tutto quello che ti serve" title="Info & Venue"/>
      <section style={{ background: "#fff", padding: "clamp(4rem, 8vw, 6.75rem) 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "clamp(1.25rem, 3vw, 2rem)" }}>
            <InfoCard title="Location" cta="Apri mappa">
              <p><strong>Arena Wave Music</strong><br/>Via Ancona 6<br/>41122 Modena (MO)</p>
            </InfoCard>
            <InfoCard title="Date" cta="Biglietti">
              <p><strong>Venerdì 5 giugno 2026</strong><br/><strong>Sabato 6 giugno 2026</strong></p>
            </InfoCard>
            <InfoCard title="Contatti">
              <p>Per info, prenotazioni o richieste di backstage scrivi a<br/><strong>info@festivalduro.it</strong></p>
            </InfoCard>
          </div>
        </Container>
      </section>
      <section style={{ background: "var(--duro-black)", color: "var(--duro-bone)", padding: "clamp(4rem, 8vw, 6.75rem) 0" }}>
        <Container>
          <SectionTitle>FAQ</SectionTitle>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li><FaqItem defaultOpen q="A che ora si inizia?" a="I cancelli aprono alle 19:00. Il primo live parte alle 20:30, headliner intorno alle 22:30."/></li>
            <li><FaqItem q="Come arrivo all'Arena?" a="Via Ancona 6, Modena. Bus linea 7 dalla stazione centrale. Parcheggio gratuito dietro l'arena."/></li>
            <li><FaqItem q="Serve il biglietto?" a="Sì. Prevendita sul nostro canale ufficiale. Cassa anche la sera stessa."/></li>
            <li><FaqItem q="Posso portare da bere?" a="No, ma dentro trovi bar, food truck e un'area coperta se piove."/></li>
          </ul>
        </Container>
      </section>
    </>
  );
}

function BandDetailPage({ band, onBack }) {
  return (
    <section style={{ background: "var(--duro-black)", color: "var(--duro-bone)", padding: "clamp(4rem, 8vw, 6.75rem) 0", minHeight: "70vh" }}>
      <Container>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--duro-yellow)" }}>
          <a onClick={onBack} style={{ cursor: "pointer", color: "var(--duro-yellow)" }}>← Torna alla line-up</a>
        </p>
        <h1 style={{ color: "var(--duro-yellow)" }}>{band.nome}</h1>
        {band.headliner && <Kicker inverse>Headliner</Kicker>}
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(240px, .8fr) minmax(0, 1.2fr)",
          gap: "clamp(1.5rem, 4vw, 3rem)", marginTop: "2rem",
        }}>
          <div>
            <img src={band.foto} alt={band.nome}
                 style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover",
                          border: "4px solid var(--duro-yellow)", filter: "grayscale(1) contrast(1.1)", display: "block" }}/>
          </div>
          <div>
            <p><strong>Sul palco:</strong> {band.giorno} ore {band.orario}</p>
            <p>{band.bio}</p>
            <ul style={{ listStyle: "none", margin: "1.25rem 0 0", padding: 0, display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <li><a style={{ color: "var(--duro-yellow)", cursor: "pointer" }}>Sito web</a></li>
              <li><a style={{ color: "var(--duro-yellow)", cursor: "pointer" }}>Instagram</a></li>
              <li><a style={{ color: "var(--duro-yellow)", cursor: "pointer" }}>Spotify</a></li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Container({ children }) {
  return <div style={{ width: "100%", maxWidth: "var(--max-width)", margin: "0 auto", padding: "0 var(--gutter)" }}>{children}</div>;
}
function Grid({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "clamp(1.25rem, 3vw, 2rem)" }}>{children}</div>;
}

Object.assign(window, { HomePage, LineupPage, InfoPage, BandDetailPage, BANDS });
