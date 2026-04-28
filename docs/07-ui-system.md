# UI System

## Product Direction

FoodHub should feel clear, practical, and food-first rather than generic dashboard-only UI.

The interface needs two modes:

- a welcoming public browsing experience
- efficient authenticated work areas for customers, providers, and admins

## Design Principles

- prioritize readable menu and order information
- keep pricing, status, and availability highly legible
- make role transitions obvious so users know whether they are in public, customer, provider, or admin space
- use consistent empty, loading, and error states

## Core UI Building Blocks

### Catalog components

- meal cards
- provider cards
- search bars
- sort controls
- dietary and availability badges

### Ordering components

- order summary
- order status timeline
- quantity controls
- review form

### Dashboard components

- sidebar or section nav
- tables or list views
- filters
- confirmation dialogs
- toast or inline action feedback

## Status Language

These backend states should have consistent UI labels and styling:

- `PENDING`
- `CONFIRMED`
- `PREPARING`
- `READY`
- `DELIVERED`
- `CANCELLED`
- `AVAILABLE`
- `UNAVAILABLE`
- `ACTIVE`
- `SUSPENDED`

## Form Rules

- reflect backend validation closely
- show field-level errors from `errorDetails`
- preserve submitted values on failure
- avoid inventing fields the backend does not support

Examples:

- signup should not ask for role selection
- order creation should not ask for total amount
- provider profile creation should be a dedicated flow

## Public Navigation

Minimum public nav areas:

- Home
- Meals
- Providers
- Login
- Signup

Later additions can include:

- account menu when authenticated
- provider dashboard shortcut
- admin shortcut for admins

## Accessibility Baseline

- keyboard-accessible forms and dialogs
- visible focus states
- semantic headings
- descriptive labels for all inputs
- color usage that does not rely on hue alone for status meaning

## Performance Notes

- prefer server-rendered catalog content
- keep interactive islands small
- optimize images for meal and provider visuals
- avoid placing heavy client state at the root unless truly shared
