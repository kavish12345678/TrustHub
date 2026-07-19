import PublicLayout from "../layouts/PublicLayout";
import SectionContainer from "../components/common/SectionContainer";
import { Button, Card } from "../components/ui";
import "../styles/landing.css";

const FEATURES = [
  {
    icon: "⬆",
    iconClass: "th-feature-icon",
    title: "Upload & hash",
    text: "Submit documents and generate deterministic SHA-256 fingerprints without exposing file contents on-chain.",
  },
  {
    icon: "⛓",
    iconClass: "th-feature-icon th-feature-icon--purple",
    title: "Anchor on Ethereum",
    text: "Register hashes via TrustHub smart contracts so integrity proofs become publicly verifiable and immutable.",
  },
  {
    icon: "✓",
    iconClass: "th-feature-icon th-feature-icon--emerald",
    title: "Instant verification",
    text: "Re-hash any presented file and compare it against the on-chain record to confirm authenticity in seconds.",
  },
  {
    icon: "◷",
    iconClass: "th-feature-icon",
    title: "Verification history",
    text: "Track registrations and checks over time so teams always know when a document was anchored.",
  },
  {
    icon: "◎",
    iconClass: "th-feature-icon th-feature-icon--purple",
    title: "Privacy by design",
    text: "Only cryptographic hashes leave your vault. Original documents stay off-chain under your control.",
  },
  {
    icon: "⬡",
    iconClass: "th-feature-icon th-feature-icon--emerald",
    title: "Enterprise-ready UX",
    text: "A modern SaaS workflow for compliance, legal, and ops teams who need trust without blockchain jargon.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Upload a document",
    text: "Choose a file from your device. TrustHub prepares it for hashing—no on-chain bytes, ever.",
  },
  {
    n: "2",
    title: "Generate SHA-256",
    text: "A cryptographic fingerprint uniquely represents the file. Any edit produces a different hash.",
  },
  {
    n: "3",
    title: "Verify anytime",
    text: "Later, upload the same file again. Match the hash to Ethereum and prove nothing changed.",
  },
];

const WHY_POINTS = [
  {
    title: "Immutable evidence",
    text: "Once a hash is mined into a block, it cannot be quietly rewritten by an issuer or intermediary.",
  },
  {
    title: "Independent auditability",
    text: "Anyone with the file can recompute the hash and check the public ledger—no private API required.",
  },
  {
    title: "Minimal on-chain footprint",
    text: "TrustHub stores proofs, not documents. Gas stays efficient; confidential content stays private.",
  },
];

const SECURITY = [
  {
    code: "SHA-256",
    title: "Collision-resistant hashing",
    text: "Industry-standard fingerprints make silent tampering computationally infeasible.",
  },
  {
    code: "OFF-CHAIN",
    title: "Documents never on-chain",
    text: "Raw files remain in controlled storage. Only digests and metadata touch Ethereum.",
  },
  {
    code: "JWT · TLS",
    title: "Hardened API surface",
    text: "Planned auth and transport protections keep account and upload paths production-ready.",
  },
  {
    code: "EVENTS",
    title: "Auditable registrations",
    text: "Contract events create a transparent timeline of when each hash was anchored.",
  },
];

function Landing() {
  return (
    <PublicLayout>
      <div className="th-landing">
        {/* Hero */}
        <section className="th-hero" aria-labelledby="hero-heading">
          <div className="th-hero__atmosphere" aria-hidden="true">
            <div className="th-hero__grid" />
            <div className="th-hero__orb th-hero__orb--blue" />
            <div className="th-hero__orb th-hero__orb--purple" />
          </div>

          <div className="th-hero__content">
            <div className="th-hero__brand">
              <span className="th-hero__brand-mark" aria-hidden="true" />
              <span className="th-hero__brand-name">TrustHub</span>
            </div>

            <h1 id="hero-heading" className="th-hero__headline">
              Prove documents are authentic—on Ethereum.
            </h1>

            <p className="th-hero__support">
              Hash files with SHA-256, anchor proofs on-chain, and verify authenticity anytime
              without exposing the original document.
            </p>

            <div className="th-hero__actions">
              <Button variant="primary" size="lg" to="/register">
                Start verifying
              </Button>
              <Button variant="ghost" size="lg" href="#how-it-works">
                See how it works
              </Button>
            </div>
          </div>

          <div className="th-hero__chain" aria-hidden="true">
            <div className="th-hero__ring" />
            <div className="th-hero__ring th-hero__ring--2" />
            <div className="th-hero__ring th-hero__ring--3" />
            <div className="th-hero__hash">0x7f3a…c91e</div>
          </div>
        </section>

        {/* Features */}
        <SectionContainer
          id="features"
          eyebrow="Capabilities"
          title="Everything you need to trust a document"
          subtitle="A focused toolkit for hashing, anchoring, and verifying—built for teams that care about integrity."
          align="center"
        >
          <div className="th-feature-grid">
            {FEATURES.map((feature) => (
              <Card key={feature.title} hoverable>
                <div className={feature.iconClass} aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="th-feature-title">{feature.title}</h3>
                <p className="th-feature-text">{feature.text}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>

        {/* How it works */}
        <SectionContainer
          id="how-it-works"
          eyebrow="Workflow"
          title="How TrustHub works"
          subtitle="Three clear steps from upload to cryptographic proof."
          align="center"
        >
          <div className="th-steps">
            {STEPS.map((step) => (
              <Card key={step.n}>
                <span className="th-step__number" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="th-step__title">{step.title}</h3>
                <p className="th-step__text">{step.text}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>

        {/* Why blockchain */}
        <SectionContainer
          id="why-blockchain"
          eyebrow="Why blockchain"
          title="Integrity that does not depend on a single database"
          subtitle="Centralized seals can be altered. Ethereum-backed hashes create shared, independent evidence."
        >
          <div className="th-split">
            <div>
              <p className="th-feature-text" style={{ fontSize: "1.05rem", marginBottom: "1.5rem" }}>
                TrustHub combines off-chain privacy with on-chain finality: your files stay private,
                while their fingerprints become part of a public ledger anyone can audit.
              </p>
              <Button variant="outline" size="md" to="/verify">
                Try verification
              </Button>
            </div>
            <ul className="th-split__list">
              {WHY_POINTS.map((point) => (
                <li key={point.title} className="th-split__item">
                  <span className="th-split__bullet" aria-hidden="true" />
                  <div>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SectionContainer>

        {/* Security */}
        <SectionContainer
          id="security"
          eyebrow="Security"
          title="Designed for cryptographic assurance"
          subtitle="Modern hashing, minimal on-chain data, and a hardened SaaS surface for real-world deployments."
          align="center"
        >
          <div className="th-security-grid">
            {SECURITY.map((item) => (
              <Card key={item.title} hoverable>
                <div className="th-security-stat">{item.code}</div>
                <h3 className="th-feature-title">{item.title}</h3>
                <p className="th-feature-text">{item.text}</p>
              </Card>
            ))}
          </div>
        </SectionContainer>

        {/* CTA */}
        <SectionContainer spacing="tight" className="th-landing-cta">
          <div className="th-cta">
            <h2 className="th-cta__title">Ready to anchor trust?</h2>
            <p className="th-cta__text">
              Create an account and start registering document proofs. Backend wiring comes next—
              the experience starts here.
            </p>
            <div className="th-cta__actions">
              <Button variant="primary" size="lg" to="/register">
                Create account
              </Button>
              <Button variant="ghost" size="lg" to="/login">
                Log in
              </Button>
            </div>
          </div>
        </SectionContainer>
      </div>
    </PublicLayout>
  );
}

export default Landing;
