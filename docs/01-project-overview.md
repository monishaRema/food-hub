# Frontend Project Overview

## Summary

FoodHub Frontend is the customer-facing and dashboard-facing web client for the FoodHub platform. It sits on top of the current Express and Prisma backend and should mirror that backend's real capabilities instead of assuming extra features.

The frontend serves four user contexts:

- public visitors
- authenticated customers
- providers
- admins

## Product Areas

### Public experience

- browse available meals
- search and sort meals
- view meal details and meal reviews
- browse providers
- view provider details
- register and log in

### Customer experience

- view current profile
- create orders
- view own orders
- view single order details
- cancel eligible orders
- review delivered meals

### Provider experience

- create provider profile
- manage own meals
- view provider orders
- update provider order status

### Admin experience

- manage categories
- manage user status

## Backend Rules The Frontend Must Respect

- one order can include meals from only one provider
- only meals with `AVAILABLE` status can be ordered
- duplicate meal ids in one order are rejected
- order totals are computed by backend data, not by client input
- only delivered orders can be reviewed
- a user can review a meal only once
- provider actions are scoped to the authenticated provider account

## Important Current Backend Realities

- base path is `/api`, not `/api/v1`
- auth is cookie-based, not bearer-token based
- public provider detail does not currently include a provider meal list
- `GET /api/orders` may currently return `401` for a user with no orders

These are not just implementation details. They should influence page design, empty states, and integration code.

## Frontend Responsibilities

- present backend data clearly
- guide users through valid flows
- surface backend validation and business-rule failures well
- keep public and dashboard experiences organized
- use Next.js App Router patterns appropriately

## Frontend Non-Responsibilities

The frontend should not:

- act as the final source of authorization
- invent unsupported backend filters or endpoints
- calculate trusted totals
- send ownership fields the backend can derive
- store auth tokens in browser storage

## Data Flow

```txt
Next.js route -> feature UI -> API layer -> backend -> response normalization -> render
```
