import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/#features", label: "Features", hash: "features" },
  { to: "/#how-it-works", label: "How it works", hash: "how-it-works" },
  { to: "/verify", label: "Verify" },
  { to: "/upload", label: "Upload" },
  { to: "/#security", label: "About us", hash: "security" },
];

const SECTION_IDS = ["features", "how-it-works", "security"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return undefined;
    }

    const observers = [];
    const ratios = new Map();

    const updateActive = () => {
      let best = "";
      let bestRatio = 0;
      ratios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      setActiveHash(bestRatio > 0.18 ? best : "");
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          updateActive();
        },
        { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.2, 0.4, 0.6] }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [location.pathname]);

  const handleHashClick = (hash) => {
    setOpen(false);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const linkBase =
    "relative px-3 py-2 text-sm font-medium transition-colors duration-300 after:absolute after:bottom-1 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-th-blue after:to-th-purple after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100";

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-400 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#050816]/55 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:gap-4 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight text-white sm:text-xl"
          aria-label="TrustHub home"
        >
          <span className="h-7 w-7 rounded-[0.55rem] bg-gradient-to-br from-th-blue to-th-purple shadow-[0_0_0_rgba(99,102,241,0)] transition duration-300 group-hover:shadow-[0_0_26px_rgba(139,92,246,0.7)] sm:h-8 sm:w-8 sm:rounded-lg" />
          TrustHub
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isHashActive = link.hash && activeHash === link.hash;
            if (link.hash) {
              return (
                <a
                  key={link.label}
                  href={link.to}
                  className={`${linkBase} ${
                    isHashActive ? "text-white after:scale-x-100" : "text-slate-400"
                  }`}
                  onClick={(event) => {
                    if (window.location.pathname === "/") {
                      event.preventDefault();
                      handleHashClick(link.hash);
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive ? "text-white after:scale-x-100" : "text-slate-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:text-white sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="group hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-th-blue to-th-purple px-3.5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] sm:inline-flex"
          >
            Get started
            <FiArrowRight className="transition-transform group-hover:translate-x-0.5" size={14} />
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition hover:border-white/30 hover:bg-white/5 md:hidden"
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-[#050816]/92 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {NAV_LINKS.map((link) =>
                link.hash ? (
                  <a
                    key={link.label}
                    href={link.to}
                    className={`rounded-lg px-3 py-2.5 text-sm transition ${
                      activeHash === link.hash
                        ? "bg-white/5 text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
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
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm transition ${
                        isActive
                          ? "bg-white/5 text-white"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`
                    }
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
