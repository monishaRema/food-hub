# Auth And RBAC

## Backend Truth

The backend uses cookie-based JWT authentication.

Cookies:

- `access-token`
- `refresh-token`

Protected routes depend on cookies rather than an `Authorization` bearer header.

## Frontend Responsibilities

- keep auth state in sync with backend cookies
- avoid storing tokens in localStorage
- fetch the current user from `GET /auth/me`
- use user role only for UX branching, never as a security boundary

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

1. submit `POST /auth/login`
2. backend sets cookies
3. fetch `GET /auth/me`
4. store only safe user profile data in app state
5. redirect by role or intended destination

### App bootstrap

1. on server-rendered authenticated pages, attempt to read the current user
2. if unauthenticated, redirect to `/login`
3. if authenticated but wrong role for the area, redirect away

### Logout

1. call `POST /auth/logout`
2. clear local auth state
3. redirect to a public page

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

## Guard Patterns

Recommended helpers:

- `requireUser()`
- `requireRole(role)`
- `getOptionalSessionUser()`

These can live in a server-side auth utility layer and be reused by protected pages.

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
