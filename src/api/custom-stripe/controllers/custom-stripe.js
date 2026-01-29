'use strict';

const Stripe = require('stripe');

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SK || 'sk_test_placeholder');

module.exports = {
    /**
     * Endpoint to process a donation/payment
     * POST /api/custom-stripes/charge
     */
    async charge(ctx) {
        try {
            const { amount, token, currency } = ctx.request.body;

            if (!amount || !token) {
                return ctx.badRequest('Amount and Token are required');
            }

            const charge = await stripe.charges.create({
                amount: Math.round(amount * 100),
                currency: currency || 'usd',
                source: token,
                description: 'Strapi Checker Test Charge',
            });

            return ctx.send({
                status: 'success',
                message: 'Payment processed successfully',
                charge_id: charge.id,
                receipt: charge.receipt_url,
                livemode: charge.livemode
            });

        } catch (err) {
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
};
