# GrubHub Partner API — Postman v12 Demo

A food-delivery themed API service built to demonstrate Postman v12 Enterprise capabilities to GrubHub.

## Quick Start

```bash
npm install
npm start
```

The API and demo web UI are available at **http://localhost:3000**.

## What's Included

| Component | Description |
|---|---|
| **Express API** | REST endpoints for restaurants, menus, orders, and delivery tracking |
| **OpenAPI Spec** | Full YAML specification at `spec/grubhub-partner-api.yaml` |
| **Demo Web UI** | Teleprompter, API explorer, and presentation slides |
| **GitHub Actions** | CI pipeline running Postman CLI tests and governance checks |

## API Endpoints

All endpoints are prefixed with `/api/v1` and require an `X-API-Key` header.

### Restaurants
- `GET /api/v1/restaurants` — List partner restaurants
- `GET /api/v1/restaurants/:id` — Get restaurant details
- `POST /api/v1/restaurants` — Register new restaurant
- `PUT /api/v1/restaurants/:id` — Update restaurant
- `DELETE /api/v1/restaurants/:id` — Remove restaurant

### Menus
- `GET /api/v1/restaurants/:restaurantId/menu` — Get full menu
- `POST /api/v1/restaurants/:restaurantId/menu/items` — Add menu item
- `PUT /api/v1/menu/items/:itemId` — Update menu item
- `DELETE /api/v1/menu/items/:itemId` — Remove menu item

### Orders
- `POST /api/v1/orders` — Place an order
- `GET /api/v1/orders/:id` — Get order details
- `GET /api/v1/orders` — List orders (filterable by status, restaurant)
- `PUT /api/v1/orders/:id/status` — Update order status

### Delivery
- `GET /api/v1/deliveries/:orderId/tracking` — Live delivery tracking
- `PUT /api/v1/deliveries/:orderId/assign` — Assign a driver
- `GET /api/v1/deliveries/active` — List active deliveries

### Health
- `GET /api/v1/health` — Service health check

## Authentication

Include the header `X-API-Key: grubhub-demo-key-2026` with every request.
The health endpoint does not require authentication.

## Postman Workspace

This project is connected to a Postman v12 workspace via Git sync.
The OpenAPI spec at `spec/grubhub-partner-api.yaml` is the source of truth.
Collections and environments in Postman are derived from this spec.
