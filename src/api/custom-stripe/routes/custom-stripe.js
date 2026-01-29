'use strict';

module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/custom-stripes/charge',
            handler: 'custom-stripe.charge',
            config: {
                auth: false, // Public endpoint for testing
            },
        },
        {
            method: 'GET',
            path: '/custom-stripes/config',
            handler: 'custom-stripe.getConfig',
            config: {
                auth: false,
            },
        },
    ],
};
