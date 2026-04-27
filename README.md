# FoodHub Frontend

FoodHub Frontend is the Next.js client application for the FoodHub meal ordering platform. It consumes the FoodHub Backend API and provides public meal browsing, customer ordering, provider meal management, provider order processing, reviews, and admin-facing management screens.

The backend repository is `FoodHub-Backend`. The frontend must follow the backend API contract documented there, especially the cookie-based authentication model and role-based route separation.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Backend API: Express, TypeScript, Prisma, PostgreSQL

Current frontend package versions:

- Next.js `16.2.4`
- React `19.2.4`
- Tailwind CSS `4.x`

## Core Product Scope

### Public users

- Browse meals
- Search and sort meals
- View meal details
- View meal reviews
- Browse providers
- View provider details
- Register and login

### Customers

- View profile
- Create orders
- View own orders
- View order details
- Cancel eligible orders
- Review delivered meals

### Providers

- Create provider profile
- Manage own meals
- View provider orders
- Update order status through the valid lifecycle

### Admins

- Manage users
- Manage categories

## Backend Contract Summary

Base API path:

```txt
/api
```

Authentication model:

- Login sets `access-token` and `refresh-token` as `httpOnly` cookies.
- Protected requests must include cookies.
- Frontend fetch calls to protected API routes must use `credentials: "include"` when calling the backend directly from the browser.
- Server-side calls must forward the incoming cookie header when needed.

Standard success response:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

Standard error response:

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

## Required Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

Do not store secrets in the frontend. JWT secrets, database URLs, and bcrypt configuration belong only in the backend.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
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

## Suggested Frontend Structure

```txt
src/
  app/
    (public)/
    (auth)/
    (customer)/
    (provider)/
    (admin)/
  components/
    ui/
    shared/
    forms/
  features/
    auth/
    meals/
    orders/
    provider/
    reviews/
    admin/
  lib/
    api/
    auth/
    utils/
  types/
```

## Documentation

Project-specific frontend docs live in [`docs`](./docs):

- [01-project-overview.md](./docs/01-project-overview.md)
- [02-frontend-architecture.md](./docs/02-frontend-architecture.md)
- [03-routing-plan.md](./docs/03-routing-plan.md)
- [04-api-integration.md](./docs/04-api-integration.md)
- [05-auth-and-rbac.md](./docs/05-auth-and-rbac.md)
- [06-feature-modules.md](./docs/06-feature-modules.md)
- [07-ui-system.md](./docs/07-ui-system.md)
- [08-development-roadmap.md](./docs/08-development-roadmap.md)

## Engineering Rules

- Do not trust client-side role checks alone. Backend authorization remains the source of truth.
- Do not send `userId`, `providerId`, order total, meal price, or role-sensitive fields from frontend when backend can infer them.
- Keep backend response handling centralized.
- Use server components for public read-heavy pages where possible.
- Use client components only for interactive UI, forms, optimistic actions, and local state.
- Keep route groups aligned with product roles: public, auth, customer, provider, admin.

## Current Status

This frontend is at initial setup stage. The README and docs define the intended implementation direction before feature development begins.
