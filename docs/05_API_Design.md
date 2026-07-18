# 05 — API Design

## Base URL (local)

`http://localhost:5000`

## Current Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check — `{ "message": "TrustHub Backend Running" }` |

## Planned Endpoints (Future)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Obtain JWT |
| POST | `/api/documents/upload` | Upload file, hash, register |
| GET | `/api/documents` | List user documents |
| GET | `/api/documents/:id` | Document detail |
| POST | `/api/documents/verify` | Verify file against chain |
| GET | `/api/profile` | Current user profile |

## Cross-Cutting

- JSON body parsing
- CORS, Helmet, Morgan
- JWT auth middleware (not yet)
- Multer for multipart uploads (not yet wired to routes)

## Status

Only the root health route is implemented.
