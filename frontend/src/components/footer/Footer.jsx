import { Link } from "react-router-dom";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", to: "/#features" },
      { label: "Verify", to: "/verify" },
      { label: "Upload", to: "/upload" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", to: "/#how-it-works" },
      { label: "Security", to: "/#security" },
      { label: "Why blockchain", to: "/#why-blockchain" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "Profile", to: "/profile" },
    ],
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="th-footer">
      <div className="th-container">
        <div className="th-footer__grid">
          <div>
            <div className="th-footer__brand">TrustHub</div>
            <p className="th-footer__tagline">
              Document authenticity anchored on Ethereum. Hash, register, and verify
              with cryptographic certainty.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="th-footer__col-title">{column.title}</h3>
              <ul className="th-footer__links">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="th-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="th-footer__bottom">
          <span>© {year} TrustHub. All rights reserved.</span>
          <span>SHA-256 · Ethereum · Off-chain privacy</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
