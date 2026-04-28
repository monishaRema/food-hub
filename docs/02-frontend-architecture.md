# Frontend Architecture

## Architecture Goals

The frontend should stay:

- aligned with the backend contract
- organized by feature
- efficient with App Router server rendering
- explicit about auth and role boundaries

## High-Level Shape

```txt
src/
  app/          -> routing, layouts, route-level data entry points
  features/     -> domain UI and feature actions
  components/   -> shared and primitive UI
  lib/          -> API client, auth helpers, utilities
  types/        -> shared contract and view-model types
```

## App Router Guidance

This project is using Next.js App Router, so these rules matter:

- Server Components are the default
- layouts are persistent shared UI
- route groups help organize product areas without changing the URL
- the top-level `app/layout.tsx` remains the single root layout

## Layer Responsibilities

### `src/app`

- pages and layouts
- route-level loading and error files later on
- coarse redirect and guard decisions
- server-rendered data loading for pages

### `src/features`

- feature-specific components
- forms
- local feature actions
- feature-level state and view models

### `src/components`

- UI primitives
- shared shell pieces
- reusable display components

### `src/lib/api`

- fetch wrapper
- request helpers
- response parsing
- domain API functions

### `src/lib/auth`

- session lookup
- role guards
- cookie-aware server helpers

### `src/types`

- API envelope types
- backend enum mirrors
- feature-facing shared interfaces

## Render Strategy

### Prefer Server Components for

- meal list and detail reads
- provider list and detail reads
- initial authenticated dashboard reads
- any route where SEO or fast first paint matters

### Prefer Client Components for

- forms
- button-driven mutations
- browser-only state
- URL filter controls
- optimistic updates

## Suggested Request Flow

```txt
Page/Layout -> feature loader or API helper -> backend -> normalized result -> UI
```

Mutations should flow through thin action helpers rather than being embedded directly across page files.

## Separation Rules

- do not mix HTTP details directly into display components
- do not spread backend response-envelope parsing across the app
- keep role gating close to routes and server helpers
- keep reusable UI independent from backend endpoint knowledge
