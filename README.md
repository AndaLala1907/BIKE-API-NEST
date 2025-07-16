BikeAPI-NestJS Backend

BikeAPI is a modular backend system built with NestJS and MongoDB, designed to manage smart bicycles, IoT devices, user journeys, and real-time statistics with fine-grained role-based access.

## Live Deployment

-Base API URL: "https://bike-api-nest.onrender.com"
-Swagger Docs: "https://bike-api-nest.onrender.com/api-docs"

## Technologies

-NestJS (Modular Architecure)
-MongoDB + Mongoose
-JWT Authentication
-Role-based Access Control (Admin / User)
-CASL Policies ('@CheckPolicies', 'PoliciesGuard')
-Swagger OpenAPI Documentation
-Soft Delete with 'deletedAt'
-Automatic Calorie & Journey Statistics
-Webhook system for real-time IoT data
-Fully tested via Postman & Swagger

## Auth & Roles

-POST /auth/register - Register a new user
-POST /auth/login - Login and recieve a JWT token
-All routes protected via 'JwtAuthGuard'
-Role-based permissions enforced with 'CASL'
-'admin': manage all
-'user': manage own resources

## Key Modules

'users'- User data, roles, weights, managment
'bikes' - Bikes maanagment, linked to user, barcode, type
'devices' - Pairing/unpairing device logic
'journeys' - Start/ping/stop tracking with calorie logic
'logs' - Live GPS logs with timestamp & type
'statistics' - Auto-generated stats from journeys & logs
'roadtypes' - Classification of road types
'speedtypes' - Speed category types
'webhooks' - External events
'home' - Dashboard overview (user-based)

## API Documentation

Interactive Swagger UI is available at:  
[`/api-docs`](https://bike-api-nest.onrender.com/api-docs)

To test:

1. Register or login
2. Click "Authorize" in Swagger and paste the JWT
3. Explore and test endpoints

## Getting Started Locally

bash

1. Install dependencies
   npm install

2. Start development server
   npm run start:dev
