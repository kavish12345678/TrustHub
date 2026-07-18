# 01 — Project Overview

## Purpose

TrustHub is a blockchain-powered document verification platform. Users upload documents, compute SHA-256 hashes, anchor hashes on Ethereum, and later verify that a file has not been altered.

## Problem

Traditional document sharing relies on trust in issuers or intermediaries. Files can be swapped or edited without an independent, publicly auditable integrity check.

## Solution

- Hash documents with SHA-256 off-chain.
- Store hashes (and minimal metadata) on Ethereum via a TrustHub smart contract.
- Verify later by re-hashing a presented file and comparing against the on-chain record.

## High-Level Components

1. **Frontend** — React SPA (upload, verify, history, profile).
2. **Backend** — Express API, MongoDB metadata, file handling.
3. **Contracts** — Solidity registry on Ethereum (Hardhat toolchain).

## Out of Scope (Current Phase)

Application features, authentication, contract logic, and production deployment. This repository phase is structure and environment only.

## Related Documents

- `02_SRS.md` — requirements
- `03_Blockchain_Design.md` — on-chain design
- `04_Database_Design.md` — MongoDB models
- `05_API_Design.md` — REST API
- `06_UI_UX.md` — interface guidelines
- `07_Testing.md` — test strategy
