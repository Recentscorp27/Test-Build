# Claim Climbers Platform

This repository contains a starter implementation of a client-facing web platform for Claim Climbers. The goal is to provide veterans with a secure and transparent experience for VA disability claim assistance. This project includes a minimal Express.js server and placeholders for integrating with the GoHighLevel (GHL) API.

## Features

- User registration with two-factor authentication (TOTP QR code)
- Login endpoint issuing JWT tokens
- In-memory data store (replace with a real database)
- Example `.env` configuration
- Placeholder integration hooks for the GoHighLevel API

## Setup

1. **Clone the repository** and install dependencies:
   ```bash
   git clone <repo-url>
   cd Test-Build
   npm install
   ```

2. **Configure environment variables** by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in the secrets for `SESSION_SECRET`, `JWT_SECRET`, and your GoHighLevel API credentials.

3. **Run the server**:
   ```bash
   node src/server.js
   ```
   The API will start on `http://localhost:3000`.

## GHL API Integration

Authentication with the GoHighLevel API is done via API key. Include your key in the `GHL_API_KEY` variable. Example usage with `fetch`:

```javascript
const fetch = require('node-fetch');

async function createContact(data) {
  const res = await fetch(`${process.env.GHL_BASE_URL}/v1/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
```

### Endpoints Used
- **Contacts**: `POST /v1/contacts/`
- **Notes**: `POST /v1/contacts/{id}/notes/`
- **Files**: `POST /v1/contacts/{id}/files/`
- **Tasks**: `POST /v1/tasks/`

Refer to the [GoHighLevel API docs](https://developers.gohighlevel.com/) for full details.

### Data Models and Examples

Creating a new contact in GHL from a registered user:
```javascript
await createContact({
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
});
```

### Error Handling

All API calls should be wrapped in `try/catch` blocks and any failures logged. Failed syncs should notify administrators. Extend the `createContact` function to catch errors and log them appropriately.

## Extending the Platform

- Replace the in-memory stores with a persistent database (MongoDB, PostgreSQL, etc.).
- Implement a React or Vue frontend for a polished user experience.
- Add scheduling endpoints to integrate with GHL's calendar features.
- Include Stripe or PayPal for secure payments.

## Troubleshooting

- Ensure environment variables are set correctly. Missing `SESSION_SECRET` will cause session errors.
- GHL API responses other than HTTP 2xx indicate an issue; check your API key and payloads.

## License

MIT
