# Frontend Project Overview

## Purpose

The FoodHub frontend is responsible for presenting the meal ordering platform to users across three roles:

- Public users
- Customers
- Providers
- Admins

It consumes the backend API and enforces UI-level flows aligned with backend business rules.

## Key Backend Constraints (Must Not Be Violated)

Derived from backend rules:

- one order belongs to one provider
- only available meals can be ordered
- order lifecycle is strictly enforced
- only delivered orders can be reviewed
- one user can review one meal once

Frontend must reflect these constraints through UI and UX.

## Frontend Responsibilities

- Render server data efficiently
- Provide forms for user actions
- Handle loading, error, and empty states
- Maintain navigation and layout consistency
- Respect backend validation rules

## Non-Responsibilities

Frontend should not:

- calculate totals
- enforce business logic alone
- store sensitive data
- trust local role checks

## Data Flow

```txt
UI → fetch → backend API → DB
         ↓
      response
         ↓
       render
```

All critical decisions remain in backend services.
