# API Testing with Curl

Base URL: `http://localhost:3000`

---

## 1. Register an Owner

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name": "John Owner", "email": "owner@test.com", "password": "password123", "role": "owner"}'
```

## 2. Register a Customer

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name": "Jane Customer", "email": "customer@test.com", "password": "password123", "role": "customer"}'
```

## 3. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "owner@test.com", "password": "password123"}'
```

Save the `access_token` from the response — you'll need it for authenticated endpoints.

## 4. Create a Restaurant (Owner only)

```bash
curl -X POST http://localhost:3000/restaurant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name": "My Restaurant", "address": "123 Main St", "opening_time": "09:00", "closing_time": "22:00"}'
```

## 5. Search Restaurants
```
curl "http://localhost:3000/restaurant?name=Pizzeria&address=Tech%20Town"
```

## 6. Owner Searchs his Restaurants
```
curl -H "Authorization: Bearer <TOKEN>" "http://localhost:3000/restaurant/my" | jq
```

## 7. Health Check (Authenticated)

```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:3000/
```

---

## Quick One-Liner (Register → Login → Create Restaurant)

```bash
curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"John Owner","email":"owner@test.com","password":"password123","role":"owner"}' \
  && \
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"owner@test.com","password":"password123"}' \
  | sed 's/.*"access_token":"\([^"]*\)".*/\1/') \
  && \
curl -X POST http://localhost:3000/restaurant \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"My Restaurant","address":"123 Main St","opening_time":"09:00","closing_time":"22:00"}'
```

