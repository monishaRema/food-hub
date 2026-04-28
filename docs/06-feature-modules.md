# Feature Modules

## Goal

The frontend should grow by product feature, not by page-only duplication.

## Recommended Structure

```txt
src/
  app/
  components/
    shared/
    ui/
  features/
    auth/
    meals/
    providers/
    orders/
    reviews/
    provider/
    admin/
  lib/
    api/
    auth/
    utils/
  types/
```

## Module Responsibilities

### `features/auth`

- login form
- signup form
- current-user hooks or loaders
- auth guards and redirects

### `features/meals`

- meal listing queries
- meal cards
- meal detail presentation
- list filters and sort controls

### `features/providers`

- provider listing queries
- provider cards
- provider detail presentation

Note: public provider detail currently cannot rely on embedded provider meals from the backend.

### `features/orders`

- create order form
- order history list
- order detail UI
- cancel order actions

### `features/reviews`

- meal review list
- review submission form
- rating display components

### `features/provider`

- provider onboarding
- provider meal CRUD
- provider order listing
- provider order status controls

### `features/admin`

- category list and forms
- user list
- user status controls

## Shared Component Categories

### `components/shared`

- app header
- app footer
- empty states
- loading states
- pagination
- status badges

### `components/ui`

- primitive buttons
- inputs
- selects
- dialogs
- cards

## Module Boundaries

- feature modules can depend on `lib`, `types`, and shared components
- one feature should not reach deeply into another feature's internal files
- cross-feature reuse should move into `components/shared`, `lib`, or `types`

## Data Ownership

Keep these concerns separate:

- route files decide page composition
- feature modules own domain-specific UI and actions
- `lib/api` owns HTTP details
- `types` owns shared contract types

## First Modules To Build

Recommended implementation order:

1. `auth`
2. `meals`
3. `providers`
4. `orders`
5. `provider`
6. `reviews`
7. `admin`
