# 07 — Testing

## Goal

Define a multi-layer test strategy before feature implementation.

## Layers

| Layer | Tools (planned) | Focus |
|-------|-----------------|-------|
| Frontend | Vitest / React Testing Library | Pages, forms, services |
| Backend | Jest / Supertest | Routes, middleware, services |
| Contracts | Hardhat + Chai / Mocha | Solidity unit tests |
| E2E (later) | Playwright / Cypress | Upload → hash → verify |

## Principles

- Test hash helpers thoroughly (deterministic SHA-256).
- Mock RPC / contract calls in API tests.
- Prefer small, fast unit tests; reserve integration tests for critical paths.
- Do not commit secrets or real mainnet keys in fixtures.

## Status

No automated tests implemented in the scaffold phase. Contract test folder exists at `contracts/test/`.
