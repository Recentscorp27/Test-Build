# Claim Climbers Platform

This project provides a secure Express.js backend to support Claim Climbers' veteran clients. It demonstrates two-factor authentication and JWT-based auth with MongoDB persistence. The code also includes starter instructions for integrating the GoHighLevel (GHL) API.

## Features

- Registration with TOTP QR code
- Login issuing JWT tokens (1 hour expiry)
- MongoDB user store
- Environment validation with `dotenv-safe` and `envalid`
- Security middleware (Helmet, CORS restrictions, rate limiting)
- Pino logging and graceful shutdown
- Example GHL API helper

## Setup

1. **Clone the repository** and install dependencies
   ```bash
   git clone <repo-url>
   cd Test-Build
   npm install
   ```
2. **Create a `.env` file** from the sample and add your secrets
   ```bash
   cp .env.example .env
   ```
   Set `JWT_SECRET`, `MONGODB_URI`, `CLIENT_URL`, and your GHL credentials.
3. **Run the server**
   ```bash
   npm start
   ```
   The API listens on `http://localhost:3000`.

Use `npm run dev` during development for automatic reloads. Run `npm test` to execute Jest-based API tests.

## GHL API Integration

The GoHighLevel API uses an API key. Include your key in `GHL_API_KEY` and base URL in `GHL_BASE_URL`.
Example helper:

```javascript
const fetch = require('node-fetch');
async function createContact(data) {
  const res = await fetch(`${process.env.GHL_BASE_URL}/v1/contacts/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('GHL error');
  return res.json();
}
```

Refer to the [GHL docs](https://developers.gohighlevel.com/) for more endpoints.

## Troubleshooting

- Ensure all environment variables are defined. The app will not start if any are missing.
- Confirm MongoDB is running and the connection string is correct.
- Check API responses from GHL when syncing data.

## License

MIT
