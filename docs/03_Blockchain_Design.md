# 03 — Blockchain Design

## Goal

Anchor document integrity on Ethereum without storing document contents on-chain.

## Planned Approach

1. Client or server computes SHA-256 of the uploaded file.
2. Backend (or authorized wallet) submits the hash to `TrustHub.sol`.
3. Contract emits an event and stores a mapping from hash → registration metadata.
4. Verification reads the mapping / events and compares a freshly computed hash.

## Contract Placeholder

- Path: `contracts/contracts/TrustHub.sol`
- Status: empty scaffold — logic not implemented yet

## Tooling

- Hardhat
- ethers.js
- Local network for development; Sepolia (or similar) for staging

## Security Notes (Future)

- Access control for who may register hashes
- Replay / duplicate hash policy
- Gas-efficient storage (bytes32 hashes)
- Never put PII or file bytes on-chain

## Open Decisions

- Who pays gas (platform wallet vs user wallet)
- Indexing strategy (events + off-chain indexer vs direct reads)
- Multi-network deployment plan
