# Auth And RBAC

## Backend Truth

The backend uses JWT auth with a cookie-driven frontend session model.

Cookies:

- `access-token`
- `refresh-token`

The frontend should treat those cookies as the session source of truth. The Next proxy may also need to forward token headers because some protected backend routes can respond as if the access token is missing unless the token is surfaced explicitly.

## Frontend Responsibilities

- keep auth state in sync with backend cookies
- avoid storing tokens in localStorage
- fetch the current user from `GET /api/auth/me`
- use user role only for UX branching, never as a security boundary
- centralize refresh and retry behavior in the Next `/api/*` proxy

## Role Model

Backend roles:

- `CUSTOMER`
- `PROVIDER`
- `ADMIN`

User status values:

- `ACTIVE`
- `SUSPENDED`

Important behavior:

- registration creates a `CUSTOMER`
- a customer becomes a provider only after `POST /provider/profile`

## Recommended Auth Flow

### Login

1. submit `POST /api/auth/login`
2. backend returns `accessToken` and `refreshToken`
3. frontend writes them into `access-token` and `refresh-token` `httpOnly` cookies
4. fetch `GET /api/auth/me`
5. store only safe user profile data in app state
6. redirect by role or intended destination

### Protected request refresh flow

1. call protected backend API through the Next `/api/*` proxy
2. if backend returns `401`, call backend `/auth/refresh-token`
3. if refresh succeeds, update frontend cookies with the new access token
4. retry the original backend request
5. if refresh fails, clear auth cookies and send the user to login

This flow should live in the proxy, not in every page, provider, or component.

### App bootstrap

1. on server-rendered authenticated pages, attempt to read the current user through `requireUser()` or `getCurrentUser()`
2. if unauthenticated, redirect to `/auth/login`
3. if authenticated but wrong role for the area, redirect away

### Logout

1. call `POST /api/auth/logout`
2. clear local auth state
3. clear auth cookies
4. redirect to a public page

## Current Frontend Guard Pattern

Recommended helpers:

- `getCurrentUser()`
- `requireUser()`
- `requireRole(allowedRoles)`

These should live in a server-side auth utility layer and be reused by protected pages and dashboard layouts.

Client role checks are only for presentation:

- nav choices
- sidebar entries
- hide/show actions

They are not a security boundary.

## Recommended Frontend State Shape

```ts
type SessionUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
};
```

## Route Protection Model

### Public

- `/`
- `/meals`
- `/meals/[id]`
- `/providers`
- `/providers/[id]`
- `/login`
- `/signup`

### Customer-only

- account pages
- order pages
- review submission actions

### Provider-only

- provider profile creation
- provider meal management
- provider order management

### Admin-only

- category management
- user management

## UX Rules

- hide unavailable actions for the wrong role
- still expect backend `403` responses and show meaningful feedback
- show a dedicated empty state when a provider profile does not exist yet
- explain role promotion clearly when a customer creates a provider profile

## Known Backend Quirks

- category read routes are not admin-only today, even though they sit under `/admin/category`
- suspended-user handling is strongest at login and refresh boundaries according to backend docs, so the frontend should still handle unexpected session invalidation on any protected request

## Security Rules

- never store raw JWTs in browser storage
- do not depend on client role checks for real authorization
- do not send `userId`, `providerId`, or price totals that the backend computes itself
- do not call the backend origin directly from protected client auth flows when the same-origin proxy can own refresh and retry behavior
