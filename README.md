# JOb-API

## Features

- **Database Connection**: Connect to MongoDB using `connect.ts`.
- **Environment Setup**: Create `.env` follow `.env.example`.
- **Routers**: Use `authRoute.ts`, `orderRoute.ts`, `productRoute.ts`, `reviewRoute.ts` and `userRoute.ts` for routes.
- **User Registration**: Validate and hash user data, send email to validate email the account.
- **User Login**: Authenticate users, generate tokens, and refresh token.
- **Mongoose Errors**: Handle validation, duplicate email, validator package, and cast errors..
- **Security**: Implement `helmet`, CORS, `xss-clean`, `rate limiting`, `express-mongo-sanitize`.
- **Documentation**: API endpoints documented with docgen.

## Getting Started

1. Clone repository.
2. Install dependencies: `npm install`.
3. Create `.env` in root, follow `.env.example`.
4. Start server: `npm run start:dev`.

## Documentation

See Swagger documentation for API details [here](https://e-commerce-api-d9jn.onrender.com).
