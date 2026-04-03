# Vetark Suite

Vetark Suite is the new monorepo foundation for the project.

It is designed around a clean separation between frontend and backend, a
feature-first folder structure, and a local development stack that is easy to
understand, extend, and maintain.

## Overview

- Frontend and backend live in separate applications
- Shared tooling is managed from a single Turborepo workspace
- PostgreSQL and Redis are available through Docker Compose
- Feature code is grouped by domain so each area can evolve independently
- The local `oldversion/` directory is kept only as a migration reference and is
  intentionally excluded from Git history

## Tech Stack

- Monorepo: Turborepo
- Frontend: Next.js 16, React 19, App Router
- Backend: NestJS 11
- Language: TypeScript
- Database: PostgreSQL 16
- Cache: Redis 7
- Package manager: npm workspaces

## Workspace Layout

```text
vetark-suite/
|-- apps/
|   |-- api/
|   `-- web/
|-- docs/
|   |-- architecture.md
|   |-- conventions.md
|   |-- roadmap.md
|   `-- README.md
|-- packages/
|   |-- eslint-config/
|   |-- typescript-config/
|   `-- ui/
|-- oldversion/
|-- docker-compose.yml
|-- package.json
|-- README.md
`-- turbo.json
```

## Core Directories

- `apps/web`: Next.js frontend application
- `apps/api`: NestJS backend application
- `packages/ui`: shared UI package for reusable frontend primitives
- `packages/eslint-config`: shared lint configuration
- `packages/typescript-config`: shared TypeScript presets
- `docs`: project-level documentation and planning notes
- `oldversion`: local-only legacy reference, not committed to the repository

## Feature-First Structure

The project follows a feature-first convention on both sides of the stack.

Frontend example:

- `apps/web/src/features/login/components/`
- `apps/web/src/features/login/hooks/`
- `apps/web/src/features/login/api/`
- `apps/web/src/features/login/schema/`

Backend example:

- `apps/api/src/modules/login/login.module.ts`
- `apps/api/src/modules/login/login.controller.ts`
- `apps/api/src/modules/login/login.service.ts`
- `apps/api/src/modules/login/dto/`

This keeps each domain isolated. When a feature changes, the related code is
easy to find. When a feature is removed, the cleanup stays localized.

## Quick Start

Install dependencies:

```bash
npm install
```

Start infrastructure:

```bash
docker compose up -d
```

Run the full workspace:

```bash
npm run dev
```

Run a single application:

```bash
npm run dev --workspace web
npm run dev --workspace api
```

## Default Local Endpoints

- Web: `http://localhost:3000`
- API health: `http://localhost:4000/api/health`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## Root Commands

- `npm run dev`: run active development tasks through Turbo
- `npm run build`: build all workspace apps and packages
- `npm run lint`: run lint checks across the workspace
- `npm run check-types`: run TypeScript checks across the workspace
- `npm run docker:up`: start PostgreSQL and Redis
- `npm run docker:down`: stop local infrastructure
- `npm run docker:logs`: stream Docker Compose logs

## Documentation

Project documentation lives in `docs/`.

- `docs/README.md`: documentation index
- `docs/architecture.md`: system structure and responsibility boundaries
- `docs/conventions.md`: folder rules and naming conventions
- `docs/roadmap.md`: high-level project roadmap

## Current Status

The repository currently includes:

- a working Turborepo workspace
- a starter Next.js frontend
- a starter NestJS backend
- a local PostgreSQL and Redis stack
- baseline documentation for architecture, conventions, and roadmap

## Roadmap Summary

- Phase 1: foundation and infrastructure
- Phase 2: authentication and account flows
- Phase 3: domain modules and shared business logic
- Phase 4: operational hardening, testing, and deployment

Detailed planning lives in `docs/roadmap.md`.
