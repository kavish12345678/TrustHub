import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";

const NAV_LINKS = [
  { to: "/#features", label: "Features", hash: "features" },
  { to: "/#how-it-works", label: "How it works", hash: "how-it-works" },
  { to: "/verify", label: "Verify" },
  { to: "/upload", label: "Upload" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleHashClick = (hash) => {
    setOpen(false);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="th-navbar">
      <div className="th-container th-navbar__inner">
        <Link to="/" className="th-navbar__brand" aria-label="TrustHub home">
          <span className="th-navbar__mark" aria-hidden="true" />
          TrustHub
        </Link>

        <nav className="th-navbar__nav" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                className="th-navbar__link"
                onClick={(event) => {
                  if (window.location.pathname === "/") {
                    event.preventDefault();
                    handleHashClick(link.hash);
                  }
                }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  ["th-navbar__link", isActive ? "th-navbar__link--active" : ""]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="th-navbar__actions">
          <Button variant="ghost" size="sm" to="/login" className="th-navbar__desktop-only">
            Log in
          </Button>
          <Button variant="primary" size="sm" to="/register" className="th-navbar__desktop-only">
            Get started
          </Button>
          <button
            type="button"
            className="th-navbar__toggle"
            aria-expanded={open}
            aria-controls="th-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div
        id="th-mobile-nav"
        className={["th-navbar__mobile", open ? "is-open" : ""].filter(Boolean).join(" ")}
      >
        <nav className="th-navbar__mobile-nav" aria-label="Mobile">
          {NAV_LINKS.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                className="th-navbar__link"
                onClick={(event) => {
                  if (window.location.pathname === "/") {
                    event.preventDefault();
                    handleHashClick(link.hash);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className="th-navbar__link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Button variant="ghost" size="sm" to="/login" onClick={() => setOpen(false)}>
            Log in
          </Button>
          <Button variant="primary" size="sm" to="/register" onClick={() => setOpen(false)}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
