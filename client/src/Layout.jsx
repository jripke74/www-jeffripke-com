import { useEffect, useId, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ExternalLink } from "./ui.jsx";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Layout({ children }) {
  const location = useLocation();
  const menuId = useId();
  const buttonRef = useRef(null);
  const [narrow, setNarrow] = useState(() => window.matchMedia("(max-width: 39.99rem)").matches);
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const media = window.matchMedia("(max-width: 39.99rem)");
    const onChange = () => {
      setNarrow(media.matches);
      if (!media.matches) {
        setOpen(false);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const menuHidden = narrow && !open;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-bar">
            <a className="brand" href="/">
              Jeff Ripke
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="nav-toggle-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
          <nav id={menuId} className="site-nav" aria-label="Main" hidden={menuHidden}>
            <ul>
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <ExternalLink href="https://www.ripkemedia.com">Ripke Media</ExternalLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <nav className="footer-links" aria-label="Footer">
            <ExternalLink href="https://www.ripkemedia.com">Ripke Media</ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/jeffripke/">LinkedIn</ExternalLink>
            <ExternalLink href="https://github.com/jripke74">GitHub</ExternalLink>
          </nav>
          <p className="muted">
            © {year} Jeff A. Ripke. This site is served at www.jeffripke.com and
            www.ripkeenterprises.com.
          </p>
        </div>
      </footer>
    </>
  );
}
