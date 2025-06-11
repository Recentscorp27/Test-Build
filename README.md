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

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourorg/claim-climbers-platform
   cd Test-Build
   ```
2. **Install dependencies** using [Node.js 18+](https://nodejs.org/en/download/)
   ```bash
   npm install
   ```
3. **Create a `.env` file** from the sample and add your secrets
   ```bash
   cp .env.example .env
   ```
   Set `JWT_SECRET`, `MONGODB_URI`, `CLIENT_URL`, and your GHL credentials.
4. **Run the server**
   ```bash
   npm start
   ```
   The API listens on `http://localhost:3000`.

Use `npm run dev` during development for automatic reloads. Run `npm test` to execute Jest-based API tests.
## Cloud Deployment

1. Set environment variables on your server (see `.env.example`).
2. Point `CLIENT_URL` to your production front-end domain.
3. Run `npm install --production` then `node src/server.js` via a process manager like pm2.
4. Ensure port `$PORT` is open on your firewall or load balancer.
5. If terminating HTTPS elsewhere, enable TLS on that proxy.


## GHL API Integration

All claim actions are mirrored to [GoHighLevel](https://developers.gohighlevel.com/).
Create an API key from your agency dashboard at <https://app.gohighlevel.com/>
(Settings → API Keys) and place it in `GHL_API_KEY`. Use
`https://api.gohighlevel.com` for `GHL_BASE_URL`.

### Common endpoints

- `POST /v1/contacts/` – create a client record
- `PATCH /v1/contacts/:id` – update client status
- `POST /v1/tasks/` – assign tasks
- `POST /v1/notes/` – attach notes or files
- `POST /v1/conversations/messages/` – send a message
- `GET /v1/appointments/` – list scheduled appointments

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
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

Consult the official docs for payload formats and required scopes.
API errors are logged with Pino and surfaced to admins.

### Extending

See the service modules in `src/services/` for examples of calling GHL.
Add new helpers as you integrate additional API features.

## Troubleshooting

- Verify you are running Node.js 18 or newer.
- Ensure MongoDB is accessible from your environment.
- Ensure all environment variables are defined. The app will not start if any are missing.
- Check API responses from GHL when syncing data.

## License

MIT
