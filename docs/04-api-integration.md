# API Integration

## Goal

This frontend should consume the current backend contract exactly as implemented today, including known quirks.

Backend base URL:

```txt
http://localhost:5000/api
```

## Integration Rules

- centralize HTTP calls in one API layer
- normalize success and error responses in one place
- always use same-origin Next route handlers for protected browser requests
- forward cookies from server-rendered requests when calling protected Next `/api/*` endpoints
- never trust client-calculated totals, role, or ownership fields

## Suggested API Layer Structure

```txt
src/
  lib/
    api/
      client.ts
      errors.ts
      types.ts
      auth.ts
      meals.ts
      providers.ts
      orders.ts
      reviews.ts
      provider.ts
      admin.ts
```

## Core Fetch Wrapper Requirements

The shared API client should:

- read the correct base URL from environment
- support `GET`, `POST`, `PATCH`, and `DELETE`
- default JSON headers when a JSON body is sent
- parse the backend `success/message/data` envelope
- surface `errorDetails` in a typed way
- support `credentials: "include"` in browser requests
- keep server-side protected requests on same-origin `/api/*`

## Current Protected Request Path

```txt
browser -> /api/* -> Next route handler proxy -> backend /api/*
server -> apiFetchServer("/api/*") -> Next route handler proxy -> backend /api/*
```

The route handler proxy is responsible for:

- forwarding the incoming cookie header
- forwarding `authorization`, `access-token`, and `refresh-token` headers when available
- calling backend `/auth/refresh-token` after a `401`
- retrying the original backend request with the refreshed access token
- clearing auth cookies when refresh fails

## Route Groups to Integrate

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /auth/me`

### Public catalog

- `GET /meals`
- `GET /meals/:id`
- `GET /meals/:id/reviews`
- `GET /providers`
- `GET /providers/:id`

### Customer

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/cancel`
- `POST /reviews`

### Provider

- `POST /provider/profile`
- `GET /provider/meals`
- `GET /provider/meals/:id`
- `POST /provider/meals`
- `PATCH /provider/meals/:id`
- `DELETE /provider/meals/:id`
- `GET /provider/orders`
- intended backend contract: `PATCH /provider/orders/:id/status`

### Admin

- `GET /admin/category`
- `GET /admin/category/:id`
- `POST /admin/category`
- `PATCH /admin/category/:id`
- `DELETE /admin/category/:id`
- `GET /admin/users`
- intended backend contract: `PATCH /admin/users/:id/status`

## Known Backend Quirks

The backend docs call out some mismatches between intended API design and current route wiring:

- provider order status update is documented as `PATCH /provider/orders/:id/status`, but backend overview docs say current wiring is inconsistent
- user status update is intended as `PATCH /admin/users/:id/status`, while another backend overview note mentions current router wiring is unusual
- `GET /orders` may return `401` when the user has no orders

Frontend guidance:

- keep these calls behind isolated API functions
- handle unexpected `401` or method mismatch responses gracefully
- avoid hard-coding UI assumptions that depend on undocumented response variations

## Query Parameters

### Meals list

- `search`
- `page`
- `limit`
- `sortBy`
- `sortOrder`

### Providers list

- `search`
- `page`
- `limit`
- `sortBy`
- `sortOrder`

### Orders and provider meals

- `page`
- `limit`

## Recommended Type Areas

```txt
src/types/
  api.ts
  auth.ts
  meal.ts
  provider.ts
  order.ts
  review.ts
  admin.ts
```

Important enums to mirror from backend docs:

- `UserRole`
- `UserStatus`
- `DietaryType`
- `OrderStatus`
- `MealAvailability`

## Error Handling

UI should treat these as first-class states:

- `400` validation failure with field details
- `401` unauthenticated
- `403` unauthorized
- `404` missing resource
- `409` business-rule conflict

Auth-specific handling:

- backend protected requests may return `401` for expired or invalid access tokens
- backend refresh may return `403` for invalid refresh tokens
- the Next proxy should translate refresh failure into a cleared session and login redirect flow at the app level

Examples:

- cancel order after it is no longer cancellable -> `409`
- delete category still in use -> `409`
- review meal before delivery -> `409`

## SSR and Browser Request Guidance

### Server-rendered reads

Use server-side data fetching for:

- public catalog pages
- initial authenticated dashboards where cookie forwarding is available

### Browser mutations

Use client-side requests for:

- login and signup
- logout
- create order
- create review
- provider meal create/update/delete
- provider order status changes
- admin mutations

Protected browser mutations should still prefer same-origin `/api/*` routes instead of talking to the backend origin directly.
