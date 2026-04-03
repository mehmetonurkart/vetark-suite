This folder owns the shared PostgreSQL access layer.

Current files:

- `database.module.ts`: exports the database service to backend features
- `database.service.ts`: wraps the PostgreSQL pool and query execution

Place cross-feature database wiring here so feature modules can depend on one
shared access point instead of opening connections on their own.
