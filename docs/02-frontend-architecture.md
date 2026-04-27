# Frontend Architecture

## Architecture Style

- Feature-based structure
- App Router layout grouping
- Separation of concerns:

```txt
UI → hooks → api layer → backend
```

## Layer Responsibilities

### App Router (src/app)

- routing
- layouts
- server components

### Features (src/features)

- domain logic per feature
- API calls
- hooks

### Components

- reusable UI
- layout components

### lib/api

- centralized fetch wrapper
- error handling

## Fetch Strategy

- Public pages → Server Components
- Auth pages → Client Components
- Mutations → Server Actions or client fetch

## Key Rule

Do not mix:

- UI rendering
- API logic
- business decisions

Each must stay isolated.
