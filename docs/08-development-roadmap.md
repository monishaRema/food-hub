# Development Roadmap

## Objective

Ship the frontend in stages that match the backend's implemented capabilities.

## Phase 1: Foundation

- clean up route naming around meals and providers
- establish root, public, auth, and dashboard layouts
- add shared API client and contract types
- configure environment handling
- set metadata defaults and shared loading/error states

## Phase 2: Public Catalog

- home page
- meal list page with search, pagination, and sorting
- meal detail page
- meal reviews section
- provider list page
- provider detail page

## Phase 3: Authentication

- signup flow
- login flow
- logout flow
- current-session bootstrap
- role-aware redirects

## Phase 4: Customer Experience

- account page
- create order flow
- order history
- order detail view
- cancel order action
- delivered-order review submission

## Phase 5: Provider Experience

- create provider profile flow
- provider meal list
- provider meal create/edit/delete
- provider orders list
- provider order status progression UI

## Phase 6: Admin Experience

- category management
- user list
- user status update UI

## Phase 7: Hardening

- loading, error, and empty states across all routes
- retry and refresh behavior for auth edge cases
- route protection review
- responsive polish
- accessibility pass

## Testing Priorities

- auth flows with cookie-based sessions
- create order validation around one-provider rule
- cancel order visibility by status
- review submission only after delivered orders
- provider meal ownership boundaries in UI
- admin action visibility and failure handling

## Risks To Watch

- backend route quirks causing method or status mismatches
- unauthenticated versus suspended-user edge cases
- provider detail page expectations versus current backend payload
- inconsistent handling of empty order history
