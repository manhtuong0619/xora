# VAULT PLATFORM

Technical Breakdown and Work Breakdown for a vault system where users deposit USDC and receive ERC-20 vault tokens representing ownership shares.

## 1. System Overview

Vault Platform allows users to deposit USDC into a vault and receive a vault token (ERC-20) that represents their ownership position.

## Vault Lifecycle

1. Vault Creation
2. Deposit Phase
3. Vault Lock Period
4. NAV Tracking
5. Secondary Market Trading
6. Redemption
7. Custody via Safe multisig

## Technical Breakdown

- Vault business logic runs off-chain in backend services.
- Smart contracts are intentionally minimal and use a standard ERC-20 vault token.
- On-chain token balances represent ownership, while operational logic is managed off-chain.

## Work Breakdown

1. Vault setup and lifecycle configuration
2. Deposit processing and vault-token issuance
3. Lock period enforcement and state management
4. NAV tracking and valuation updates
5. Secondary market support for vault-token transfers/trading
6. Redemption processing and settlement
7. Safe multisig custody controls and operational approvals
