# Architecture

## Purpose

Vetark Suite is organized as a monorepo so frontend, backend, shared packages,
and project documentation can evolve together while remaining clearly separated.

## Top-Level Boundaries

- `apps/web`: user-facing frontend application
- `apps/api`: backend API and business modules
- `packages/*`: reusable shared tooling or UI packages
- `docs/*`: project documentation
- `docker-compose.yml`: local infrastructure services

## Frontend Responsibilities

The frontend is responsible for:

- routing and page composition
- user interface implementation
- feature-level components and hooks
- route protection through the session cookie
- communication with backend endpoints

Route entry files stay in `apps/web/app`, while feature logic stays in
`apps/web/src/features`.

The current frontend includes:

- `app/login`: login route entry
- `app/page.tsx`: authenticated home route
- `src/features/login`: login form and session helpers
- `src/features/dashboard`: oldversion-inspired dashboard UI
- `proxy.ts`: redirect logic for authenticated and unauthenticated requests

## Backend Responsibilities

The backend is responsible for:

- HTTP API endpoints
- business rules and domain modules
- current authentication and future authorization logic
- access to infrastructure such as PostgreSQL and Redis

Backend feature code lives in `apps/api/src/modules`.

The current backend auth implementation includes:

- `src/modules/login`: login, session lookup, and logout endpoints
- `src/infrastructure/database`: shared PostgreSQL query access
- `src/config/env.ts`: environment loading for API configuration
- `scripts/setup-local-db.ts`: local auth-table bootstrap and demo-user seed

## Shared Packages

Shared packages reduce duplication between apps.

- `packages/ui`: reusable frontend UI primitives
- `packages/eslint-config`: lint rules shared across the workspace
- `packages/typescript-config`: TypeScript presets shared across the workspace

## Local Infrastructure

The local development stack currently includes:

- PostgreSQL for primary persistence
- Redis for caching, queues, or ephemeral storage needs

Both services are managed through the root `docker-compose.yml` file.

The API currently uses PostgreSQL directly for the login user table. Redis is
available for future caching, queues, or session-related expansion.

## Recommended Growth Pattern

As features are added, keep the architecture consistent:

- add frontend feature folders in `apps/web/src/features/<feature>`
- add backend modules in `apps/api/src/modules/<feature>`
- only place shared code in `packages/*` when it is truly cross-application

This prevents unrelated domains from becoming tightly coupled.
