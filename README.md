# Strapi Stripe Backend for Testing

This is a minimal Strapi v4 setup designed to be deployed on Strapi Cloud for payment testing.

## Features

- **Custom Stripe Controller**: Located in `src/api/custom-stripe`.
- **Public Endpoints**:
    - `POST /api/custom-stripes/charge`: Accepts `{ amount, token }` to simulate a charge.
    - `GET /api/custom-stripes/config`: Returns the configured PK (useful for verifying env vars).

## Deployment Steps

1.  Push this repository to your GitHub.
2.  In Strapi Cloud, select this repository.
3.  In the **Environment Variables** section of Strapi Cloud, add:
    - `STRIPE_SK`: Your Stripe Secret Key (`sk_live_...` or `sk_test_...`)
    - `STRIPE_PK`: Your Stripe Publishable Key (`pk_live_...` or `pk_test_...`)

## Testing

Once deployed, you can point your Python Checker to `https://your-project.strapiapp.com/api/custom-stripes/charge`.
