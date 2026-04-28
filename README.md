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

- login sets `access-token` and `refresh-token` as `httpOnly` cookies
- protected requests depend on cookies, not bearer headers
- browser requests to protected endpoints must use `credentials: "include"`
- server-side requests should forward the incoming cookie header when needed

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
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

If the frontend later adds a server-only API base URL, keep it separate from public browser config. Do not place backend secrets in this repository.

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
