# TrustHub Specification

> Living document for architecture, standards, and engineering workflow.  
> Update this file when project conventions change.

---

## 1. Project Vision

TrustHub is a blockchain-powered document verification platform. Users upload documents, generate SHA-256 hashes, store those hashes on Ethereum, and later verify authenticity against the immutable on-chain record—without storing raw document contents on-chain.

---

## 2. Objectives

- Provide tamper-evident document verification using cryptographic hashing and Ethereum.
- Offer a clear web UI for upload, verify, history, and profile workflows.
- Keep private document storage off-chain (backend / object storage) while anchoring integrity on-chain.
- Ship a maintainable monorepo: `frontend/`, `backend/`, `contracts/`, `docs/`.
- Establish secure defaults (Helmet, CORS, env-based secrets, hashed passwords) before feature work.

---

## 3. Architecture

```
┌─────────────┐     REST/JSON      ┌─────────────┐     Mongoose     ┌──────────┐
│  Frontend   │ ◄────────────────► │   Backend   │ ◄──────────────► │ MongoDB  │
│ React+Vite  │                    │ Express API │                  └──────────┘
└─────────────┘                    └──────┬──────┘
                                          │ ethers.js
                                          ▼
                                   ┌─────────────┐
                                   │  Ethereum   │
                                   │ TrustHub.sol│
                                   └─────────────┘
```

| Layer | Responsibility |
|-------|----------------|
| Frontend | UI, routing, client-side hash preview (future), API calls |
| Backend | Auth, uploads, hash orchestration, DB, blockchain service |
| Contracts | On-chain hash registry / verification |
| MongoDB | Users, document metadata, tx references (not raw file blobs on-chain) |

---

## 4. Folder Structure

```
TrustHub/
├── TRUSTHUB_SPEC.md
├── README.md
├── .gitignore
├── docs/                 # Product & engineering documentation
├── frontend/             # React + Vite SPA
├── backend/              # Express API + MongoDB
└── contracts/            # Hardhat + Solidity
```

---

## 5. Coding Standards

- Prefer clarity over cleverness; keep modules single-purpose.
- Do not commit secrets; use `.env` locally and `.env.example` as the template.
- Avoid drive-by refactors unrelated to the task.
- Match existing style in a folder before introducing new patterns.
- Fail loudly in development; handle errors gracefully in production paths.
- No application feature logic in setup scaffolding until intentionally implemented.

---

## 6. Naming Conventions

| Area | Convention | Example |
|------|------------|---------|
| React components | PascalCase | `DocumentUpload.jsx` |
| Hooks | `use` + camelCase | `useDocumentHash.js` |
| Utilities / services | camelCase | `hashDocument.js` |
| Express routes | kebab-case paths | `/api/documents` |
| Controllers / models | PascalCase files for models | `User.js` |
| Solidity contracts | PascalCase | `TrustHub.sol` |
| Env vars | SCREAMING_SNAKE | `MONGO_URI` |
| Docs | numbered snake/Title | `02_SRS.md` |

---

## 7. Frontend Rules

- Stack: React + Vite + **Tailwind CSS** (approved for marketing / premium UI).
- Motion: Framer Motion; particles via `@tsparticles/react` (slim).
- Routing via `react-router-dom`; pages live under `src/pages/`.
- Shared UI under `src/components/`; hero layers under `src/components/hero/`.
- HTTP clients under `src/services/` (axios).
- Keep pages thin; push API and hash helpers into services/utils.
- No blockchain private keys in the browser for server-owned wallets.

---

## 8. Backend Rules

- Stack: Express, Mongoose, Helmet, Morgan, CORS, dotenv.
- Entry: `server.js` (or `src/server.js` if relocated later—keep one clear entry).
- Config in `src/config/`; connect MongoDB only when the server starts.
- Auth (JWT + bcrypt) is planned; do not ship half-wired auth endpoints until designed.
- Uploads via Multer into `uploads/` (gitignored contents).
- Use Node built-in `crypto` for hashing—do not install the deprecated npm `crypto` package.

---

## 9. Blockchain Rules

- Hardhat for compile, test, and deploy scripts.
- Contracts under `contracts/contracts/`; scripts under `contracts/scripts/`; tests under `contracts/test/`.
- Store **hashes and metadata**, never full documents, on-chain.
- Prefer events for indexing; keep contract surface minimal and auditable.
- Network and private keys only via environment variables.

---

## 10. Git Workflow

1. Create a feature branch from `main` (or `develop` if introduced).
2. Implement focused changes; keep commits small and related.
3. Open a pull request; request review before merge.
4. Never commit `.env`, keys, or `uploads/` contents.

---

## 11. Commit Message Format

Follow Conventional Commits:

```
<type>(optional-scope): <short summary>

[optional body]
```

**Types:** `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `build`, `ci`

**Examples:**

```
feat(backend): add document upload endpoint
fix(frontend): correct verify route path
docs: expand blockchain design notes
chore: scaffold Hardhat project
```

---

## 12. Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, deployable baseline |
| `develop` | Integration branch (optional) |
| `feature/<name>` | New features |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Tooling, scaffolding, deps |
| `docs/<name>` | Documentation-only |

Delete feature branches after merge.

---

## 13. Future Modules

- User authentication (register, login, JWT middleware)
- Document upload + SHA-256 generation
- Ethereum hash anchoring (`TrustHub.sol` logic)
- Verification flow (hash compare on-chain)
- Document history and user profile
- Admin / audit views
- Automated tests (unit, integration, contract)
- CI/CD pipeline
- Production deployment (API, SPA, MongoDB, RPC provider)

---

*TrustHub — Document authenticity, anchored on Ethereum.*
