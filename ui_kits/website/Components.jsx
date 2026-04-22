const { useState: useS2, useEffect: useE2 } = React;

function useIsNarrow(breakpoint = 720) {
  const [narrow, setNarrow] = useS2(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useE2(() => {
    const onResize = () => setNarrow(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return narrow;
}

/* ============ HERO (home) — chiaro, gerarchico, responsivo ============
   Layout:
     1) corner ornament top-right (luci) — decor, non sovrasta
     2) logo centrato, ben distanziato dagli ornamenti
     3) striscia nera compatta: DATE · CITTÀ · VENUE  (3 colonne su desktop, stack su mobile)
     4) CTA
     5) corner ornament bottom-left (alberi) — decor, chiude la cornice
================================================================ */
function Hero({ onNav }) {
  const narrow = useIsNarrow(720);
  return (
    <section style={{
      position: "relative", background: "var(--duro-yellow)",
      borderBottom: "5px solid var(--duro-black)",
      padding: narrow
        ? "1.75rem 0 2rem"
        : "clamp(2.25rem, 4vw, 3.25rem) 0 clamp(2.5rem, 5vw, 4rem)",
      overflow: "hidden",
      isolation: "isolate",
    }}>
      {/* Corner ornaments: più piccoli, posizionati agli angoli, non sovrappongono il contenuto */}
      <img src="../../assets/hero-corner-tr.png" alt="" aria-hidden="true"
           style={{
             position: "absolute", top: 0, right: 0, zIndex: 0,
             width: narrow ? "45%" : "min(28%, 360px)",
             maxWidth: 420,
             pointerEvents: "none", userSelect: "none",
           }}/>
      <img src="../../assets/hero-corner-bl.png" alt="" aria-hidden="true"
           style={{
             position: "absolute", bottom: 0, left: 0, zIndex: 0,
             width: narrow ? "45%" : "min(28%, 360px)",
             maxWidth: 420,
             pointerEvents: "none", userSelect: "none",
           }}/>

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "var(--max-width)", margin: "0 auto",
        padding: "0 var(--gutter)",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: narrow ? "1rem" : "clamp(1rem, 2vw, 1.5rem)",
        textAlign: "center",
      }}>
        <Kicker>4ª Edizione — Music Fest</Kicker>

        {/* Logo: max-width fluida, padding verticale per respirare dagli ornamenti */}
        <h1 style={{ margin: 0, width: "100%", padding: narrow ? "0.25rem 0" : "0.5rem 0" }}>
          <img src="../../assets/logo-black-wide-1200.png" alt="Festival Duro"
               style={{
                 width: "min(100%, 720px)",
                 margin: "0 auto", display: "block",
               }} />
          <span style={{
            display: "block", marginTop: "0.35rem",
            fontFamily: "var(--font-body)", fontWeight: 700,
            fontSize: narrow ? "0.8rem" : "0.95rem",
            letterSpacing: "0.02em", textTransform: "none",
            color: "var(--duro-black)",
          }}>
            Musica live · due serate · Modena
          </span>
        </h1>

        {/* Meta strip nera: 3 colonne chiare su desktop, stack pulito su mobile */}
        <div style={{
          width: "min(100%, 780px)",
          background: "var(--duro-black)", color: "var(--duro-yellow)",
          border: "3px solid var(--duro-black)",
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "repeat(3, 1fr)",
        }}>
          <MetaCell label="Quando" value="5–6 giugno 2026" sub="Ven. & sab." divider={!narrow} narrow={narrow} last={false}/>
          <MetaCell label="Dove" value="Arena Wave Music" sub="Via Ancona 6" divider={!narrow} narrow={narrow} last={false}/>
          <MetaCell label="Città" value="Modena" sub="Emilia-Romagna" divider={false} narrow={narrow} last={true}/>
        </div>

        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: "0.75rem", marginTop: "0.25rem",
          width: narrow ? "100%" : "auto",
        }}>
          <Button onClick={() => onNav("lineup")} style={narrow ? { flex: "1 1 140px" } : {}}>Vedi line-up</Button>
          <Button variant="ghost" onClick={() => onNav("info")} style={narrow ? { flex: "1 1 140px" } : {}}>Info &amp; Venue</Button>
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value, sub, divider, narrow, last }) {
  return (
    <div style={{
      padding: narrow ? "0.9rem 1rem" : "1rem 1.15rem",
      borderRight: divider ? "1px solid rgba(255, 212, 0, 0.25)" : "none",
      borderBottom: narrow && !last ? "1px solid rgba(255, 212, 0, 0.25)" : "none",
      textAlign: "center",
    }}>
      <span style={{
        display: "block", fontFamily: "var(--font-display)",
        fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--duro-yellow)", opacity: 0.7,
      }}>{label}</span>
      <strong style={{
        display: "block", marginTop: "0.35rem",
        fontFamily: "var(--font-display)",
        fontSize: narrow ? "1.05rem" : "clamp(1rem, 1.8vw, 1.3rem)",
        lineHeight: 1.15, letterSpacing: "0.04em", textTransform: "uppercase",
      }}>{value}</strong>
      {sub && (
        <span style={{
          display: "block", marginTop: "0.3rem",
          fontFamily: "var(--font-body)", fontWeight: 700,
          fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase",
          color: "var(--duro-bone)", opacity: 0.75,
        }}>{sub}</span>
      )}
    </div>
  );
}

/* ============ PAGE HERO (secondary) ============ */
function PageHero({ kicker, title }) {
  const narrow = useIsNarrow(720);
  return (
    <section style={{
      background: "var(--duro-yellow)", borderBottom: "5px solid var(--duro-black)",
      padding: narrow ? "1.5rem 0 1.75rem" : "clamp(2rem, 4vw, 3rem) 0",
      position: "relative", overflow: "hidden", isolation: "isolate",
    }}>
      <img src="../../assets/hero-corner-tr.png" alt="" aria-hidden="true"
           style={{ position: "absolute", top: 0, right: 0, zIndex: 0,
                    width: narrow ? "40%" : "min(22%, 260px)", pointerEvents: "none" }}/>
      <img src="../../assets/hero-corner-bl.png" alt="" aria-hidden="true"
           style={{ position: "absolute", bottom: 0, left: 0, zIndex: 0,
                    width: narrow ? "40%" : "min(22%, 260px)", pointerEvents: "none" }}/>
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "var(--max-width)", margin: "0 auto",
        padding: "0 var(--gutter)", display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center", gap: "0.9rem",
      }}>
        <Kicker>{kicker}</Kicker>
        <h1 style={{ margin: 0, fontSize: narrow ? "2.2rem" : "clamp(2.5rem, 6vw, 4.5rem)" }}>{title}</h1>
      </div>
    </section>
  );
}

/* ============ BAND CARD ============ */
function BandCard({ band, onOpen }) {
  const [hover, setHover] = useS2(false);
  return (
    <a onClick={() => onOpen(band)}
       onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
       style={{
         position: "relative", overflow: "hidden",
         background: "var(--duro-bone)", color: "var(--duro-black)",
         border: "4px solid var(--duro-black)",
         display: "flex", flexDirection: "column", padding: "1.25rem",
         cursor: "pointer",
         transform: hover ? "translateY(-3px)" : "none",
         transition: "transform 180ms ease",
         textDecoration: "none",
       }}>
      {band.headliner && (
        <span style={{
          position: "absolute", top: 10, right: 10, zIndex: 2,
          padding: ".25rem .55rem", background: "var(--duro-yellow)", color: "var(--duro-black)",
          fontFamily: "var(--font-display)", fontSize: ".72rem", textTransform: "uppercase",
          border: "2px solid var(--duro-black)",
        }}>Headliner</span>
      )}
      <div style={{
        aspectRatio: "16 / 11", margin: "-1.25rem -1.25rem 1rem",
        overflow: "hidden", background: "#111",
        borderBottom: "4px solid var(--duro-black)",
      }}>
        <img src={band.foto} alt={band.nome} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)", display: "block" }}/>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", textTransform: "uppercase", margin: "0 0 .35rem" }}>{band.nome}</h3>
      <p style={{ marginTop: "auto", marginBottom: 0, color: "var(--duro-grey)", fontSize: ".85rem", fontWeight: 700, textTransform: "uppercase" }}>
        {band.giorno}{band.orario && ` — ${band.orario}`}
      </p>
    </a>
  );
}

/* ============ INFO CARD ============ */
function InfoCard({ title, children, cta, onCta }) {
  return (
    <div style={{
      position: "relative", overflow: "hidden",
      background: "var(--duro-yellow)", color: "var(--duro-black)",
      border: "4px solid var(--duro-black)", padding: "2rem",
    }}>
      <h3 style={{ marginTop: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem", textTransform: "uppercase" }}>{title}</h3>
      <div>{children}</div>
      {cta && <div style={{ marginTop: "1rem" }}><Button onClick={onCta}>{cta}</Button></div>}
    </div>
  );
}

/* ============ FAQ ============ */
function FaqItem({ q, a, defaultOpen }) {
  return (
    <details open={defaultOpen} style={{ borderTop: "2px solid currentColor", paddingBlock: "1rem" }}>
      <summary style={{ cursor: "pointer", fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: ".04em" }}>{q}</summary>
      <p style={{ marginTop: ".6rem", marginBottom: 0 }}>{a}</p>
    </details>
  );
}

/* ============ FESTIVAL PANEL ============ */
function FestivalPanel({ onCta }) {
  const narrow = useIsNarrow(820);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: narrow ? "1fr" : "minmax(0, .95fr) minmax(280px, .68fr)",
      alignItems: "center", gap: "clamp(2rem, 5vw, 4rem)",
      padding: narrow ? "1.75rem" : "clamp(2rem, 5vw, 4.5rem)",
      background: "#fff", border: "5px solid var(--duro-black)",
    }}>
      <div style={{ maxWidth: 620 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", margin: "0 0 1rem", width: "fit-content" }}>
          Il Festival
          <div style={{ height: 5, background: "currentColor", marginTop: ".45rem" }}/>
        </h2>
        <p className="lead" style={{ fontSize: "clamp(1rem, 1.7vw, 1.15rem)", fontWeight: 700, marginBottom: "1.25rem" }}>
          Festival Duro torna per la sua quarta edizione: due serate imperdibili di musica live, energia e adrenalina. Vieni a vivere l'esperienza più intensa dell'estate modenese.
        </p>
        <Button onClick={onCta}>Scopri di più</Button>
      </div>
      <figure style={{
        width: narrow ? "min(100%, 320px)" : "min(100%, 380px)",
        margin: 0, justifySelf: narrow ? "center" : "end",
        background: "var(--duro-yellow)", border: "5px solid var(--duro-black)",
        boxShadow: narrow ? "9px 9px 0 var(--duro-black)" : "14px 14px 0 var(--duro-black)",
      }}>
        <img src="../../assets/locandina.png" alt="Locandina Festival Duro 2026"
             style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "contain", display: "block" }}/>
      </figure>
    </div>
  );
}

/* ============ SECTION TITLE ============ */
function SectionTitle({ children, color = "currentColor" }) {
  return (
    <h2 style={{
      fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)",
      textTransform: "uppercase", margin: "0 0 1.4rem", width: "fit-content", maxWidth: "100%",
      color,
    }}>
      {children}
      <div style={{ height: 5, background: "currentColor", marginTop: ".45rem" }}/>
    </h2>
  );
}

Object.assign(window, { Hero, PageHero, BandCard, InfoCard, FaqItem, FestivalPanel, SectionTitle });
