# 04 — Database Design

## Goal

Persist users, document metadata, and blockchain transaction references in MongoDB. Do not treat MongoDB as the source of truth for integrity—Ethereum is.

## Planned Collections (Future)

### User

- email, passwordHash, name, timestamps

### Document

- ownerId, originalFilename, mimeType, size, sha256Hash
- storagePath (local/S3), status
- blockchainTxHash, blockNumber, contractAddress
- timestamps

### VerificationLog (optional)

- documentId / hash, result, requestedBy, timestamps

## Configuration

- Connection helper: `backend/src/config/db.js`
- URI from `MONGO_URI` in `.env`
- Connect only when the Express server starts

## Status

Schema models are not implemented in this scaffold phase.
