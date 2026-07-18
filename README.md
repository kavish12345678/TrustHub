# TrustHub

Blockchain-powered document verification platform. Users upload documents, generate SHA-256 hashes, store hashes on Ethereum, and verify authenticity against the on-chain record.

> **Status:** Architecture and development environment scaffold only. Application features are not implemented yet.

---

## Project Overview

TrustHub separates concerns across four areas:

| Area | Role |
|------|------|
| **Frontend** | React + Vite SPA for upload, verify, history, and profile |
| **Backend** | Express API, MongoDB metadata, file uploads, blockchain orchestration |
| **Contracts** | Hardhat + Solidity registry for document hashes |
| **Docs** | Product and engineering specifications |

See [TRUSTHUB_SPEC.md](./TRUSTHUB_SPEC.md) for vision, standards, and Git workflow.

---

## Folder Structure

```
TrustHub/
├── TRUSTHUB_SPEC.md
├── README.md
├── .gitignore
├── docs/
│   ├── 01_Project_Overview.md
│   ├── 02_SRS.md
│   ├── 03_Blockchain_Design.md
│   ├── 04_Database_Design.md
│   ├── 05_API_Design.md
│   ├── 06_UI_UX.md
│   ├── 07_Testing.md
│   └── (legacy empty drafts also retained)
├── frontend/          # React + Vite
├── backend/           # Express + MongoDB
└── contracts/         # Hardhat + Solidity
```

---

## Tech Stack

| Layer | Technologies |
|-------|----------------|
| Frontend | React 19, Vite, React Router, Axios |
| Backend | Node.js, Express, Mongoose, Helmet, Morgan, JWT, bcryptjs, Multer |
| Database | MongoDB |
| Blockchain | Solidity, Hardhat, Ethers |
| Crypto | Node.js built-in `crypto` (SHA-256) |

---

## Installation Steps

### Prerequisites

- Node.js 18+ (20 LTS recommended)
- npm
- MongoDB (local or Atlas URI)
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd TrustHub
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173` (default Vite port).

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGO_URI, PORT, etc.
npm run dev
```

API health check: `GET http://localhost:5000/` → `{ "message": "TrustHub Backend Running" }`

### 4. Smart contracts

```bash
cd contracts
npm install
npx hardhat compile
```

---

## Development Workflow

1. Read [TRUSTHUB_SPEC.md](./TRUSTHUB_SPEC.md) for coding and Git standards.
2. Create a branch: `feature/<name>`, `fix/<name>`, or `chore/<name>`.
3. Run frontend and backend in separate terminals during full-stack work.
4. Use Hardhat for compile / test / deploy scripts under `contracts/`.
5. Keep secrets in `.env` (never commit). Update `.env.example` when new vars are added.
6. Commit with Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
7. Open a pull request into `main` (or `develop` if used).

### Suggested local ports

| Service | Port |
|---------|------|
| Frontend (Vite) | 5173 |
| Backend (Express) | 5000 |
| Hardhat local node | 8545 |

---

## Documentation

Detailed design docs live in [`docs/`](./docs/). Fill them in as modules are designed.

---

## License

See [LICENSE](./LICENSE).
