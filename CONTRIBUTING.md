## Collaboration Structure Rules

### Goal

Keep the codebase modular, readable, and easy to maintain so collaborators can locate routes, business logic, and SSR pages quickly.

### Project Layout

- `src/routes.tsx`: global app entrypoint, middleware registration, and route composition.
- `src/shared`: cross-cutting configuration or utilities shared by multiple modules.
- `src/modules`: feature-based organization by domain.
- `public/static`: static assets (basic styles, icons, and files served as-is).

### Module Conventions

Each feature must live under its own folder in `src/modules`.

Examples:

- `src/modules/todo`
- `src/modules/env`
- `src/modules/site`

Inside each module:

- `api`: HTTP routes and request validation.
- `service`: business logic.
- `schema`: data validation schemas.
- `*.page.tsx`: SSR pages when needed.

### Import Rules

- Prefer relative imports inside the same module.
- Import from `src/shared` only for global reusable concerns.
- Avoid cross-module internal coupling (do not import private files from another module).
- Keep `src/routes.tsx` free of domain logic; use it only for composition.

### Naming Conventions

- API files: `*.api.ts`
- Services: `*.service.ts`.
- SSR views: `*.page.tsx`.
- Global shared files: `*.shared.ts` or `*.shared.tsx`.

### Pull Request Guidelines

- Keep PRs focused on one feature or concern.
- Document new endpoints or structure changes in `CONTRIBUTING.md`.
- Preserve naming and folder consistency.
- Do not mix large refactors with unrelated behavior changes in the same PR.
