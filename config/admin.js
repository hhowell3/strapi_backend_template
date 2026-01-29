module.exports = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'mock-admin-secret'),
    },
    apiToken: {
        salt: env('API_TOKEN_SALT', 'mock-api-salt'),
    },
    transfer: {
        token: {
            salt: env('TRANSFER_TOKEN_SALT', 'mock-transfer-salt'),
        },
    },
    flags: {
        nps: env.bool('FLAG_NPS', true),
        promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    tuto: {
        enabled: env.bool('TUTO_ENABLED', true),
    },
    notifications: {
        releases: env.bool('NOTIFICATIONS_RELEASES', true),
    },
});
