# Yara Escape Journeys Backend API

This is the backend API for Yara Escape Journeys Sikkim, built with Node.js and Express.  
It provides endpoints for managing packages, cars, bikes, bookings, inquiries, users, and authentication.

---

## Base URL

- **Local:** `http://localhost:4000`
- **Production (Cloud Run):** `https://yara-service-backend-418054790950.us-central1.run.app`

---

## Root Endpoint

### `GET /`

**Description:**  
Returns a welcome message and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Yara Escape Journeys API",
  "endpoints": {
    "health": "/api/health",
    "packages": "/api/packages",
    "cars": "/api/cars",
    "bikes": "/api/bikes",
    "bookings": "/api/bookings",
    "auth": "/api/auth/login"
  },
  "version": "1.0.0"
}
```

---

## Health Check

### `GET /api/health`

**Description:**  
Check if the API is running.

**Response:**
```json
{
  "status": "ok",
  "message": "API is running",
  "timestamp": "2025-04-21T12:34:56.789Z"
}
```

---

## Packages

### `GET /api/packages`

**Description:**  
Get all tour packages.

**Response:**  
Array of package objects.

### `GET /api/packages/:id`

**Description:**  
Get a specific package by ID.

**Response:**  
Package object or 404 error.

### `POST /api/packages`

**Description:**  
Create a new package.

**Request Body:**
```json
{
  "title": "String",
  "description": "String",
  "price": 12345,
  "duration": "String",
  "locations": ["String"],
  "imageUrl": "String",
  "featured": true,
  "includes": ["String"],
  "itinerary": [
    { "day": "String", "title": "String", "description": "String" }
  ]
}
```

**Response:**  
Created package object.

### `PUT /api/packages/:id`

**Description:**  
Update a package by ID.

**Request Body:**  
Same as POST (fields to update).

**Response:**  
Updated package object.

### `DELETE /api/packages/:id`

**Description:**  
Delete a package by ID.

**Response:**
```json
{ "success": true }
```

---

## Cars

### `GET /api/cars`

**Description:**  
Get all cars.

**Response:**  
Array of car objects.

### `GET /api/cars/:id`

**Description:**  
Get a specific car by ID.

**Response:**  
Car object or 404 error.

### `POST /api/cars`

**Description:**  
Create a new car.

**Request Body:**
```json
{
  "model": "String",
  "category": "String",
  "seats": 4,
  "transmission": "manual",
  "ac": true,
  "dailyRate": 2500,
  "imageUrl": "String",
  "description": "String"
}
```

**Response:**  
Created car object.

### `PUT /api/cars/:id`  
Update a car by ID.

### `DELETE /api/cars/:id`  
Delete a car by ID.

---

## Bikes

### `GET /api/bikes`

**Description:**  
Get all bikes.

**Response:**  
Array of bike objects.

### `GET /api/bikes/:id`  
Get a specific bike by ID.

### `POST /api/bikes`  
Create a new bike.

**Request Body:**
```json
{
  "model": "String",
  "category": "String",
  "engineCapacity": "String",
  "dailyRate": 1200,
  "gearType": "manual",
  "imageUrl": "String",
  "description": "String"
}
```

### `PUT /api/bikes/:id`  
Update a bike by ID.

### `DELETE /api/bikes/:id`  
Delete a bike by ID.

---

## Bookings

### `GET /api/bookings`

**Description:**  
Get all bookings.

**Response:**  
Array of booking objects.

### `GET /api/bookings/:id`  
Get a specific booking by ID.

### `POST /api/bookings`  
Create a new booking.

**Request Body:**
```json
{
  "userId": "String",
  "packageId": "String",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "status": "pending",
  "totalAmount": 15000,
  "guests": 2,
  "contactInfo": {
    "name": "String",
    "email": "String",
    "phone": "String"
  }
}
```

### `PUT /api/bookings/:id`  
Update a booking by ID.

### `DELETE /api/bookings/:id`  
Delete a booking by ID.

---

## Inquiries

### `GET /api/inquiries`

**Description:**  
Get all inquiries.

### `GET /api/inquiries/:id`  
Get a specific inquiry by ID.

### `POST /api/inquiries`  
Create a new inquiry.

**Request Body:**  
Flexible, based on inquiry type.

### `PUT /api/inquiries/:id`  
Update an inquiry by ID.

### `DELETE /api/inquiries/:id`  
Delete an inquiry by ID.

---

## Users

### `GET /api/users`

**Description:**  
Get all users.

### `GET /api/users/:id`  
Get a specific user by ID.

### `POST /api/users`  
Create a new user.

**Request Body:**
```json
{
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "user"
}
```

### `PUT /api/users/:id`  
Update a user by ID.

### `DELETE /api/users/:id`  
Delete a user by ID.

---

## Authentication

### `POST /api/auth/login`

**Description:**  
Authenticate a user.

**Request Body:**
```json
{
  "email": "admin@yaraescapejourneys.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "admin",
    "name": "Admin User",
    "email": "admin@yaraescapejourneys.com",
    "role": "admin"
  },
  "token": "base64string"
}
```

**Response (Failure):**
```json
{ "error": "Invalid credentials" }
```

---

## Setup & Demo Data

### `GET /api/setup-db`

**Description:**  
Initialize the database with demo data.

**Response:**
```json
{ "success": true, "message": "Database initialized with demo data" }
```

---

## Error Responses

- **404 Not Found:**  
  ```json
  { "error": "Item not found" }
  ```
- **500 Internal Server Error:**  
  ```json
  { "error": "Error message" }
  ```
- **401 Unauthorized (Login):**  
  ```json
  { "error": "Invalid credentials" }
  ```

---

## Notes

- All endpoints accept and return JSON.
- All POST/PUT endpoints expect a JSON body.
- CORS is enabled for all origins.
- Data is stored in local JSON files in the `data` directory.

---

## Contact

For questions or support, contact [admin@yaraescapejourneys.com](mailto:admin@yaraescapejourneys.com).

