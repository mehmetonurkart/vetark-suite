# Roadmap

## Phase 1: Foundation

Status: completed

- initialize the monorepo
- separate frontend and backend
- add shared workspace tooling
- add PostgreSQL and Redis infrastructure
- establish documentation and folder conventions

## Phase 2: Authentication

Status: in progress

- design the login and session model
- add frontend authentication screens
- add backend authentication module
- define token, session, and access control strategy

Completed in the current iteration:

- oldversion-inspired login screen
- oldversion-inspired visual dashboard shell
- session-cookie based local login flow
- seeded demo login account in PostgreSQL

Next inside this phase:

- replace the starter `app_users` table with the long-term user model
- define role and permission guards
- add password-reset and session-expiration handling

## Phase 3: Domain Modules

Status: planned

- identify the first core business modules
- implement module-by-module feature folders on both frontend and backend
- introduce shared validation and API contracts where needed

## Phase 4: Quality and Operations

Status: planned

- improve automated test coverage
- add CI-friendly workflows
- prepare environment management for staging and production
- document deployment and operations steps

## Phase 5: Product Maturity

Status: planned

- harden observability and logging
- review performance hotspots
- refine developer experience and maintainability
- expand technical documentation as the platform grows
