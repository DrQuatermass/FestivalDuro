const { useState } = React;

/* ============ BUTTON ============ */
function Button({ children, variant = "primary", onClick, href, style }) {
  const base = {
    minHeight: 54, display: "inline-flex", alignItems: "center", justifyContent: "center",
    padding: ".95rem 1.45rem", border: "3px solid var(--duro-black)",
    fontFamily: "var(--font-display)", fontSize: ".88rem", letterSpacing: ".12em",
    textTransform: "uppercase", cursor: "pointer", transition: "transform 180ms ease, background 180ms ease, color 180ms ease",
    textDecoration: "none",
  };
  const byVariant = {
    primary: { background: "var(--duro-black)", color: "var(--duro-yellow)" },
    ghost:   { background: "transparent", color: "var(--duro-black)" },
    onDark:  { background: "var(--duro-yellow)", color: "var(--duro-black)", borderColor: "var(--duro-black)" },
  };
  const [hover, setHover] = useState(false);
  const hoverStyle = hover ? { transform: "translateY(-2px)" } : {};
  const ghostHover = hover && variant === "ghost" ? { background: "var(--duro-black)", color: "var(--duro-yellow)" } : {};
  const props = {
    style: { ...base, ...byVariant[variant], ...hoverStyle, ...ghostHover, ...style },
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    onClick,
  };
  return href
    ? <a href={href} {...props}>{children}</a>
    : <button {...props}>{children}</button>;
}

/* ============ KICKER ============ */
function Kicker({ children, inverse }) {
  return (
    <span style={{
      display: "inline-flex", padding: ".55rem .95rem",
      background: inverse ? "var(--duro-yellow)" : "var(--duro-black)",
      color: inverse ? "var(--duro-black)" : "var(--duro-yellow)",
      fontFamily: "var(--font-display)", fontSize: ".78rem",
      letterSpacing: ".14em", lineHeight: 1.2, textTransform: "uppercase",
    }}>{children}</span>
  );
}

/* ============ HEADER ============ */
function SiteHeader({ current, onNav }) {
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth < 720 : false
  );
  React.useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 720);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const linkStyle = {
    display: "inline-flex", alignItems: "center", minHeight: 44,
    color: "var(--duro-yellow)", fontFamily: "var(--font-display)",
    fontSize: ".82rem", letterSpacing: ".12em", textTransform: "uppercase",
    cursor: "pointer", padding: "0 2px",
  };
  const items = [
    { id: "home", label: "Home" },
    { id: "lineup", label: "Line-up" },
    { id: "info", label: "Info & Venue" },
  ];
  const go = (id) => { onNav(id); setOpen(false); };
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "var(--duro-black)", color: "var(--duro-yellow)",
      borderBottom: "4px solid var(--duro-yellow)",
    }}>
      <div style={{
        width: "100%", maxWidth: "var(--max-width)", margin: "0 auto",
        padding: ".75rem var(--gutter)", minHeight: narrow ? 68 : 76,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      }}>
        <a onClick={() => go("home")} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
          <img src="../../assets/logo-yellow-wide.png" alt="Festival Duro"
               style={{ maxWidth: narrow ? "min(52vw, 220px)" : "min(38vw, 340px)",
                        maxHeight: 50, height: "auto", objectFit: "contain", display: "block" }} />
        </a>
        {narrow ? (
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            style={{
              display: "inline-flex", alignItems: "center", gap: ".55rem",
              height: 42, padding: "0 .8rem",
              background: "transparent", color: "var(--duro-yellow)",
              border: "2px solid currentColor", cursor: "pointer",
              fontFamily: "var(--font-display)", fontSize: ".68rem",
              letterSpacing: ".1em", textTransform: "uppercase",
            }}>
            <span>Menu</span>
            <span aria-hidden="true" style={{ width: 20, display: "inline-flex", flexDirection: "column", gap: 4 }}>
              <span style={{ display: "block", height: 2, background: "currentColor" }}/>
              <span style={{ display: "block", height: 2, background: "currentColor" }}/>
              <span style={{ display: "block", height: 2, background: "currentColor" }}/>
            </span>
          </button>
        ) : (
          <nav>
            <ul style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 2.2rem)", listStyle: "none", margin: 0, padding: 0 }}>
              {items.map(i => (
                <li key={i.id}>
                  <a onClick={() => go(i.id)}
                     style={{ ...linkStyle, opacity: current === i.id ? 1 : 0.8,
                              borderBottom: current === i.id ? "2px solid var(--duro-yellow)" : "2px solid transparent" }}>
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      {narrow && open && (
        <nav style={{ background: "var(--duro-black)", borderTop: "2px solid var(--duro-yellow)" }}>
          <ul style={{
            display: "flex", flexDirection: "column", gap: ".25rem",
            listStyle: "none", margin: 0, padding: ".8rem var(--gutter)",
          }}>
            {items.map(i => (
              <li key={i.id}>
                <a onClick={() => go(i.id)}
                   style={{ ...linkStyle, width: "100%", minHeight: 42, justifyContent: "flex-start",
                            opacity: current === i.id ? 1 : 0.75 }}>
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/* ============ FOOTER ============ */
function SiteFooter() {
  return (
    <footer style={{ background: "var(--duro-black)", color: "var(--duro-bone)" }}>
      <div style={{
        width: "100%", maxWidth: "var(--max-width)", margin: "0 auto",
        padding: "clamp(2.75rem, 5vw, 4rem) var(--gutter)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
        gap: "clamp(1.75rem, 4vw, 3rem)",
      }}>
        <div>
          <img src="../../assets/logo-yellow-stack.png" alt="Festival Duro"
               style={{ width: "min(220px, 70vw)", display: "block" }} />
        </div>
        <FooterCol title="Quando">
          <p>5 giugno &amp; 6 giugno 2026</p>
        </FooterCol>
        <FooterCol title="Dove">
          <p>Arena Wave Music<br/>Via Ancona 6<br/>Modena</p>
        </FooterCol>
        <FooterCol title="Social">
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {["Instagram", "Facebook", "YouTube"].map(s => (
              <li key={s}><a style={{ color: "var(--duro-bone)", display: "inline-block", padding: ".2rem 0", cursor: "pointer" }}>{s}</a></li>
            ))}
          </ul>
        </FooterCol>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,212,0,.2)", padding: "1rem 0", color: "var(--duro-grey)", fontSize: ".85rem" }}>
        <div style={{
          width: "100%", maxWidth: "var(--max-width)", margin: "0 auto",
          padding: "0 var(--gutter)",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: ".75rem 1.5rem",
        }}>
          <p style={{ margin: 0 }}>© 2026 Festival Duro. Tutti i diritti riservati.</p>
          <nav style={{ display: "inline-flex", gap: ".5rem" }}>
            <a style={{ color: "var(--duro-yellow)", cursor: "pointer" }}>Privacy</a>
            <span aria-hidden="true">·</span>
            <a style={{ color: "var(--duro-yellow)", cursor: "pointer" }}>Cookie</a>
          </nav>
          <p style={{ margin: 0 }}>Sito realizzato da <a style={{ color: "var(--duro-yellow)" }}>Ombra del Portico</a></p>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, children }) {
  return (
    <div>
      <h3 style={{ color: "var(--duro-yellow)", fontSize: "1rem", letterSpacing: ".1em",
                   fontFamily: "var(--font-display)", textTransform: "uppercase", margin: "0 0 .6rem" }}>{title}</h3>
      <div style={{ margin: 0, fontSize: "0.95rem" }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Button, Kicker, SiteHeader, SiteFooter });
