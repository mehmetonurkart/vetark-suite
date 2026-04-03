# Conventions

## General Principle

The codebase follows a feature-first structure instead of grouping files only by
technical type.

The main goal is simple: when a developer works on a feature, they should be able
to find the related files quickly and change that feature without touching
unrelated areas.

## Frontend Convention

Frontend route files belong in `apps/web/app`.

Frontend feature implementation belongs in `apps/web/src/features/<feature-name>`.

Typical frontend feature contents:

- `components/`
- `hooks/`
- `api/`
- `schema/`
- `types/`
- `README.md`

Example:

```text
apps/web/src/features/login/
|-- api/
|-- components/
|-- hooks/
`-- schema/
```

## Backend Convention

Backend feature implementation belongs in `apps/api/src/modules/<feature-name>`.

Typical backend feature contents:

- `<feature>.module.ts`
- `<feature>.controller.ts`
- `<feature>.service.ts`
- `dto/`
- `entities/`
- `guards/`
- `README.md`

Example:

```text
apps/api/src/modules/login/
|-- dto/
|-- guards/
|-- login.controller.ts
|-- login.module.ts
`-- login.service.ts
```

## Shared Code Rule

Move code into `packages/*` only when:

- it is reused by more than one app, or
- it represents shared tooling or shared design primitives

Do not place app-specific business logic in shared packages.

## Naming Guidance

- use clear domain names such as `login`, `appointments`, `patients`, `billing`
- prefer singular feature folder names unless the team decides otherwise
- keep related tests next to the related module or feature when practical

## Documentation Rule

When a new major module or flow is added, update:

- the nearest app-level README when the app structure changes
- the nearest feature README so the folder explains its own purpose
- `docs/architecture.md` when architectural boundaries change
- `docs/authentication.md` when login or session behavior changes
- `docs/roadmap.md` when the project phase changes
