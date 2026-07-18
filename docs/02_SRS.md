# 02 — Software Requirements Specification (SRS)

## 1. Introduction

This SRS outlines functional and non-functional requirements for TrustHub. Detailed acceptance criteria will be refined as modules are implemented.

## 2. Stakeholders

- End users verifying or registering documents
- Platform operators / admins (future)
- Developers maintaining frontend, backend, and contracts

## 3. Functional Requirements (Planned)

| ID | Requirement |
|----|-------------|
| FR-01 | User can register and log in |
| FR-02 | User can upload a document |
| FR-03 | System generates SHA-256 hash of the document |
| FR-04 | System stores hash on Ethereum via TrustHub contract |
| FR-05 | User can verify a document against the blockchain |
| FR-06 | User can view document history |
| FR-07 | User can view and update profile |

## 4. Non-Functional Requirements (Planned)

| ID | Requirement |
|----|-------------|
| NFR-01 | Secrets never committed to Git |
| NFR-02 | API protected with Helmet and CORS policy |
| NFR-03 | Passwords stored with bcrypt |
| NFR-04 | Document bytes never written on-chain |
| NFR-05 | Clear separation of frontend, backend, and contracts |

## 5. Constraints

- Ethereum-compatible network for hash anchoring
- MongoDB for off-chain metadata
- React + Vite frontend without Tailwind until approved

## 6. Status

Requirements are baseline placeholders for the scaffold phase.
