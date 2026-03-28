# TWOEM PaaS Engine

This is a NextJS starter for the TWOEM PaaS orchestration engine.

## Prerequisites

To run this application locally or in production, you must configure the following environment variables in a `.env` file at the root of your project:

### Database (Prisma + SQLite)
```env
DATABASE_URL="file:./dev.db"
```

### NextAuth Security
```env
# Generate a secret using: openssl rand -base64 32
AUTH_SECRET="your-auth-secret"

# Trust local host for development
AUTH_TRUST_HOST=true
# Or explicit URL for production
# AUTH_URL="https://yourdomain.com"
```

### Initial SuperAdmin Setup
These credentials will automatically be seeded into the database upon their first login attempt:
```env
ADMIN_EMAIL="admin@twoem.com"
ADMIN_NAME="Super Admin"
ADMIN_PASSWORD="YourSecurePassword123"
```

### Brevo SMTP Configuration (Email Delivery)
Required for account verification, password resets, and support ticket notifications.
```env
SMTP_HOST="smtp-relay.brevo.com"
SMTP_PORT="587"
SMTP_USER="your-brevo-user"
SMTP_PASS="your-brevo-pass"
EMAIL_FROM="noreply@twoem.app"
EMAIL_FROM_NAME="TWOEM PaaS Engine"
```

### OAuth Providers
Required for social login options on the authentication pages.
```env
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

GOOGLE_ID="your-google-oauth-id"
GOOGLE_SECRET="your-google-oauth-secret"
```

## Getting Started

1. Create a `.env` file and populate it using the variables above.
2. Install dependencies: `npm install`
3. Push the Prisma schema to create the SQLite database: `npx prisma db push`
4. Start the development server: `npm run dev`

Take a look at `src/app/page.tsx` to get started modifying the UI.
