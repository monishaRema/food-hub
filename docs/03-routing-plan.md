# Routing Plan

## Purpose

This document maps FoodHub product areas to Next.js App Router routes and layout boundaries.

The repo already has:

- `src/app/layout.tsx`
- `src/app/(commonLayout)/*`
- `src/app/(dashboardLayout)/*`

That is a good starting point, but the route groups should become more intentional as features grow.

## App Router Notes

Based on the bundled Next.js docs in `node_modules/next/dist/docs/`:

- the root `app/layout.tsx` must own the global `<html>` and `<body>` tags
- route groups organize routes without changing the URL
- layouts persist across navigation
- Server Components are the default in the App Router

Because this repo already has a top-level root layout, route groups here should stay nested under that root instead of becoming separate root layouts.

## Recommended Route Map

```txt
src/app/
  layout.tsx
  (public)/
    layout.tsx
    page.tsx
    meals/
      page.tsx
      [id]/
        page.tsx
    providers/
      page.tsx
      [id]/
        page.tsx
  (auth)/
    layout.tsx
    login/
      page.tsx
    signup/
      page.tsx
  (customer)/
    layout.tsx
    account/
      page.tsx
    orders/
      page.tsx
      [id]/
        page.tsx
  (provider)/
    layout.tsx
    provider/
      page.tsx
    provider/meals/
      page.tsx
      new/
        page.tsx
      [id]/
        page.tsx
      [id]/edit/
        page.tsx
    provider/orders/
      page.tsx
      [id]/
        page.tsx
  (admin)/
    layout.tsx
    admin/categories/
      page.tsx
    admin/users/
      page.tsx
```

## Mapping from Current Routes

Suggested route renames from the current scaffold:

- `/shop` -> `/providers`
- `/shop/[id]` -> `/providers/[id]`
- `/meal` -> `/meals`
- `/meal/[id]` -> `/meals/[id]`

These names align better with the backend route groups:

- `/api/meals`
- `/api/providers`

## Layout Responsibilities

### Root layout

- global fonts
- global styles
- metadata defaults
- shared providers that truly apply to the whole app

### Public layout

- header
- footer
- public navigation
- cart or auth entry points if later added

### Auth layout

- centered auth shell
- simplified navigation
- redirect logic for already-authenticated users

### Customer layout

- authenticated account navigation
- order-focused secondary nav

### Provider layout

- provider dashboard nav
- meal management and order management shell

### Admin layout

- admin navigation
- stricter access checks

## Data Strategy by Route Type

Use Server Components by default for:

- home page
- meal list
- meal detail
- provider list
- provider detail
- authenticated read-only dashboards where server rendering is useful

Use Client Components selectively for:

- login and signup forms
- search/filter controls that sync with URL state
- create/edit meal forms
- order creation forms
- review submission
- optimistic UI around order status changes

## Guardrails

- do not put mutable request-specific auth logic high in shared layouts unless necessary
- keep route params and search params handled at page level when possible
- use route groups for organization, not as a substitute for clear feature boundaries
