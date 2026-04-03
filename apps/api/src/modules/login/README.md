This module owns the login flow for the backend.

Contents:

- HTTP login endpoint
- session-cookie creation
- current-user lookup
- logout endpoint
- repository access for login users
- PostgreSQL-backed demo account lookup

If authentication expands later, keep related DTOs, services, guards, and
repositories inside this folder.

Local demo credentials:

- Username: `vetark`
- Password: `vetark4154`
