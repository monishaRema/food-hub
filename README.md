# FoodHub Frontend

FoodHub Frontend is the Next.js App Router client for the FoodHub meal ordering platform. It is being built against the backend in `monishaRema/FoodHub-Backend`, and the documentation here reflects that backend's `main` branch as reviewed on April 28, 2026.

The goal of this repo is to deliver a role-aware frontend for:

- public catalog browsing
- customer ordering and reviews
- provider meal and order management
- admin category and user management

## Stack

- Next.js `16.2.4`
- React `19.2.4`
- TypeScript `5`
- Tailwind CSS `4`

The app uses the App Router, where Server Components are the default and Client Components should be used only where browser interactivity is required.

## Backend Alignment

Backend repository:

```txt
https://github.com/monishaRema/FoodHub-Backend
```

Current backend base path:

```txt
/api
```

Authentication model:

- backend login returns `accessToken` and `refreshToken`
- frontend writes those values into `access-token` and `refresh-token` `httpOnly` cookies
- browser requests to protected routes should go through same-origin Next route handlers under `/api/*`
- the Next `/api/*` proxy forwards the incoming cookie header to the backend
- protected backend calls may still need token headers, so the proxy also forwards `authorization`, `access-token`, and `refresh-token`
- when a protected backend request returns `401`, the proxy calls backend `/auth/refresh-token`, updates cookies, retries the original backend request, and only sends the user to login if refresh fails

Standard response shapes:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

```json
{
  "success": false,
  "message": "Validation failed",
  "errorDetails": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

Important backend quirks the frontend must account for today:

- public provider detail does not include provider meals
- category read endpoints are authenticated, but not admin-only
- `GET /api/orders` may currently return `401` when the user has no orders
- provider order status logic exists, but route wiring is documented as inconsistent in the backend docs

## Product Scope

### Public

- browse available meals
- search and sort meals
- view meal details and reviews
- browse providers
- view provider details
- register and log in

### Customer

- view current profile
- create orders from one provider at a time
- view order history and order details
- cancel eligible orders
- submit reviews after delivery

### Provider

- create provider profile
- manage own meals
- view provider orders
- progress order status through the supported lifecycle

### Admin

- manage categories
- manage user status

## Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
FRONTEND_BASE_URL=http://localhost:3000
API_URL=http://localhost:5000/api
BACKEND_BASE_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Notes:

- `FRONTEND_BASE_URL` is used by server-side helpers when they call the same-origin Next `/api/*` routes
- `API_URL` is the backend base path used by the Next proxy
- `NEXT_PUBLIC_API_URL` remains available, but protected browser auth and dashboard requests should prefer same-origin `/api/*` routes
- do not place backend secrets in this repository

## Local Development

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Lint:

```bash
pnpm lint
```

Build:

```bash
pnpm build
```

Start production build:

```bash
pnpm start
```

Default local app URL:

```txt
http://localhost:3000
```

## Current App Shape

The current repo is still in scaffold stage. It already uses:

- a root App Router layout at `src/app/layout.tsx`
- a public route group at `src/app/(commonLayout)`
- a dashboard route-group placeholder at `src/app/(dashboardLayout)`
- starter routes for home, meal list/detail, shop list/detail, login, and signup

The documentation below defines the intended structure to grow this into a full product frontend.

## Current Auth Architecture

```txt
Browser/client component
  -> /api/*
  -> Next route handler proxy
  -> backend /api/*

Server component / server action
  -> apiFetchServer("/api/*")
  -> same-origin Next route handler proxy
  -> backend /api/*
```

Protected request behavior:

1. proxy forwards cookies and token headers to backend
2. backend may return `401` when `access-token` is missing, expired, or invalid
3. proxy calls backend `/auth/refresh-token` using `refresh-token`
4. if refresh succeeds, proxy updates cookies and retries the original backend request
5. if refresh fails, proxy clears auth cookies and returns a session-expired response

## Documentation

Frontend planning docs live in [`docs`](./docs):

- [01-project-overview.md](./docs/01-project-overview.md)
- [02-frontend-architecture.md](./docs/02-frontend-architecture.md)
- [03-routing-plan.md](./docs/03-routing-plan.md)
- [04-api-integration.md](./docs/04-api-integration.md)
- [05-auth-and-rbac.md](./docs/05-auth-and-rbac.md)
- [06-feature-modules.md](./docs/06-feature-modules.md)
- [07-ui-system.md](./docs/07-ui-system.md)
- [08-development-roadmap.md](./docs/08-development-roadmap.md)

Suggested reading order:

1. `01-project-overview.md`
2. `03-routing-plan.md`
3. `04-api-integration.md`
4. `05-auth-and-rbac.md`

## Working Rules

- treat backend authorization as the source of truth
- never send role-sensitive identifiers the backend can derive itself
- centralize API calls and response parsing
- prefer Server Components for read-heavy public views
- use Client Components for forms, local state, browser APIs, and interactive controls
- keep role-aware dashboard areas isolated from public catalog routes
