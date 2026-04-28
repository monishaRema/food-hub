<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->


You are working on the FoodHub frontend repository:

https://github.com/monishaRema/food-hub

Backend repository:

https://github.com/monishaRema/FoodHub-Backend

Goal:
Build the FoodHub frontend using Next.js App Router with a clean, production-style architecture aligned with the backend API.

Tech stack:
- Next.js 16.2.4
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- App Router

Backend base URL:
Use:

NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

Backend auth model:
- Backend uses httpOnly cookies.
- Login sets access-token and refresh-token cookies.
- Browser requests to protected endpoints must use credentials: "include".
- Server-side requests to protected endpoints must forward the incoming Cookie header.
- Do not use Bearer tokens.
- Do not store tokens in localStorage.

Backend response shape:

Success:
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}

Error:
{
  "success": false,
  "message": "Validation failed",
  "errorDetails": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}

Architecture requirement:
Use this folder structure:

src/
  app/
  features/
  components/
  lib/
    api/
    auth/
    utils/
  types/

Responsibilities:

1. src/app
- Only routes, layouts, loading/error pages, and page-level composition.
- Pages may call API functions/server loaders.
- Pages should not contain raw fetch logic.
- Pages should not contain large UI blocks.
- Route groups should organize public/auth/customer/provider/admin areas.

2. src/features
Organize by product domain, not technical type.

Use:

features/
  auth/
  meals/
  providers/
  orders/
  reviews/
  provider/
  admin/

Each feature may contain:
- components/
- actions/ or services/
- schemas/ if needed
- small feature-specific helpers

Feature examples:
- features/auth/components/LoginForm.tsx
- features/auth/components/SignupForm.tsx
- features/meals/components/MealCard.tsx
- features/meals/components/MealList.tsx
- features/meals/components/MealFilters.tsx
- features/providers/components/ProviderCard.tsx
- features/orders/components/CreateOrderForm.tsx
- features/provider/components/ProviderMealForm.tsx
- features/admin/components/UserStatusSelect.tsx

3. src/components
Only shared reusable UI.

Use:

components/
  ui/
  shared/

components/ui:
- Button
- Input
- Select
- Textarea
- Card
- Dialog
- Badge

components/shared:
- Header
- Footer
- Pagination
- EmptyState
- LoadingState
- ErrorMessage
- StatusBadge

Do not put domain-specific components here.

4. src/lib/api
All backend communication must be centralized here.

Use:

lib/api/
  client.ts
  errors.ts
  types.ts
  auth.api.ts
  meals.api.ts
  providers.api.ts
  orders.api.ts
  reviews.api.ts
  provider.api.ts
  admin.api.ts

Rules:
- No raw fetch calls inside components.
- No repeated response-envelope parsing.
- No duplicated base URL logic.
- All API functions should call the shared client.
- The API client must parse success/message/data.
- The API client must throw/return typed errors for backend errors.
- Browser mutations must include credentials: "include".
- Server-side protected reads must support forwarding cookies.

5. src/lib/auth
Use for:
- current user/session helpers
- role guard helpers
- redirect helpers
- cookie-aware server auth utilities

6. src/types
Mirror backend contract types.

Use:

types/
  api.ts
  auth.ts
  meal.ts
  provider.ts
  order.ts
  review.ts
  admin.ts

Include enums/types:
- UserRole
- UserStatus
- DietaryType
- OrderStatus
- MealAvailability

Recommended route structure:

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

Rename scaffold routes if needed:
- /shop -> /providers
- /shop/[id] -> /providers/[id]
- /meal -> /meals
- /meal/[id] -> /meals/[id]

Rendering strategy:
- Use Server Components by default.
- Use Server Components for public read pages:
  - home
  - meals list
  - meal detail
  - providers list
  - provider detail
- Use Client Components for:
  - login form
  - signup form
  - filter controls
  - create/edit forms
  - review submission
  - order creation
  - admin/provider mutations
  - local state and browser events

Data-fetching rule:
Page -> API function -> backend -> normalized result -> feature UI

Example:
app/(public)/meals/page.tsx
calls:
lib/api/meals.api.ts -> getMeals()

Do not write fetch directly in page UI components.

Form submission rule:
Form component -> feature action/helper -> lib/api function -> backend

Example:
LoginForm.tsx
calls:
loginUser()
which calls:
authApi.login()

API endpoints to support:

Auth:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh-token
- GET /auth/me

Public catalog:
- GET /meals
- GET /meals/:id
- GET /meals/:id/reviews
- GET /providers
- GET /providers/:id

Customer:
- POST /orders
- GET /orders
- GET /orders/:id
- PATCH /orders/:id/cancel
- POST /reviews

Provider:
- POST /provider/profile
- GET /provider/meals
- GET /provider/meals/:id
- POST /provider/meals
- PATCH /provider/meals/:id
- DELETE /provider/meals/:id
- GET /provider/orders
- PATCH /provider/orders/:id/status

Admin:
- GET /admin/category
- GET /admin/category/:id
- POST /admin/category
- PATCH /admin/category/:id
- DELETE /admin/category/:id
- GET /admin/users
- PATCH /admin/users/:id/status

Query params:
Meals list:
- search
- page
- limit
- sortBy
- sortOrder

Providers list:
- search
- page
- limit
- sortBy
- sortOrder

Orders/provider meals:
- page
- limit

Implementation order:
1. Create architecture folders.
2. Create shared API client.
3. Create API response/error types.
4. Create domain types.
5. Create meals API functions.
6. Build public meals list page.
7. Build meal detail page.
8. Create providers API functions.
9. Build providers list/detail pages.
10. Create auth API functions.
11. Build login/signup forms.
12. Add session/current-user helper.
13. Then move to customer orders.
14. Then provider dashboard.
15. Then admin dashboard.

Code quality rules:
- TypeScript strict style.
- No any unless unavoidable.
- No raw fetch in components.
- No backend URL hardcoded outside lib/api/client.ts.
- No token handling in localStorage.
- No role-sensitive data trusted from client input.
- Keep components small.
- Keep page files thin.
- Keep display components separate from data-fetching logic.
- Centralize backend error parsing.
- Use clear names: getMeals, getMealById, loginUser, createOrder, cancelOrder.
- Do not over-engineer with Redux/Zustand unless required later.

First task:
Set up the frontend architecture folders and implement:
- lib/api/client.ts
- lib/api/types.ts
- lib/api/errors.ts
- types/api.ts
- types/meal.ts
- lib/api/meals.api.ts
- app/(public)/meals/page.tsx
- features/meals/components/MealCard.tsx
- features/meals/components/MealList.tsx

Do not implement the whole app at once.
Start with public meals list using the architecture above.
