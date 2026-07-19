import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/#features", label: "Features", hash: "features" },
  { to: "/#how-it-works", label: "How it works", hash: "how-it-works" },
  { to: "/verify", label: "Verify" },
  { to: "/upload", label: "Upload" },
  { to: "/#security", label: "About us", hash: "security" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHashClick = (hash) => {
    setOpen(false);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkClass = ({ isActive }) =>
    [
      "relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white",
      "after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-th-blue after:to-th-purple after:transition-transform after:duration-300 hover:after:scale-x-100",
      isActive ? "text-white after:scale-x-100" : "",
    ].join(" ");

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#050816]/70 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-white"
          aria-label="TrustHub home"
        >
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-th-blue to-th-purple shadow-[0_0_0_rgba(99,102,241,0)] transition duration-300 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.65)]" />
          TrustHub
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.hash ? (
              <a
                key={link.label}
                href={link.to}
                className="relative px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-th-blue after:to-th-purple after:transition-transform after:duration-300 hover:after:scale-x-100"
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
              <NavLink key={link.label} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="group hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-th-blue to-th-purple px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] sm:inline-flex"
          >
            Get started
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" size={14} />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
            aria-expanded={open}
            aria-controls="th-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="th-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#050816]/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) =>
                link.hash ? (
                  <a
                    key={link.label}
                    href={link.to}
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
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
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <div className="mt-3 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-white/15 px-3 py-2.5 text-center text-sm text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg bg-gradient-to-r from-th-blue to-th-purple px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get started
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
