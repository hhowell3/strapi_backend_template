'use strict';

/**
 * custom-stripe controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Stripe = require('stripe');

// Initialize Stripe with your Secret Key (Environmental variable recommended in prod)
// We use a placeholder here or process.env.STRIPE_SK
const stripe = new Stripe(process.env.STRIPE_SK || 'sk_test_placeholder');

module.exports = createCoreController('api::custom-stripe.custom-stripe', ({ strapi }) => ({

    /**
     * Endpoint to process a donation/payment
     * POST /api/custom-stripes/charge
     */
    async charge(ctx) {
        try {
            const { amount, token, currency } = ctx.request.body;

            // 1. Validaciones básicas
            if (!amount || !token) {
                return ctx.badRequest('Amount and Token are required');
            }

            // 2. Intentar crear el cargo/Charge
            const charge = await stripe.charges.create({
                amount: Math.round(amount * 100), // En centavos
                currency: currency || 'usd',
                source: token, // Token pm_... o tok_...
                description: 'Strapi Checker Test Charge',
            });

            // 3. Respuesta Exitosa (Live)
            return ctx.send({
                status: 'success',
                message: 'Payment processed successfully',
                charge_id: charge.id,
                receipt: charge.receipt_url,
                livemode: charge.livemode
            });

        } catch (err) {
            // 4. Manejo de Errores (Dead / Decline)
            return ctx.badRequest('Payment Failed', {
                error: err.message,
                code: err.code,
                decline_code: err.decline_code
            });
        }
    },

    /**
     * Endpoint to get current PK
     * GET /api/custom-stripes/config
     */
    async getConfig(ctx) {
        return ctx.send({
            publishable_key: process.env.STRIPE_PK || 'pk_test_placeholder_exposed_by_api',
            mode: process.env.NODE_ENV
        });
    }

}));
