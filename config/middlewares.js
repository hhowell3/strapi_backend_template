module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: 'local',
            sizeLimit: 100000,
        },
    },
});
