const target = 'https://localhost:7249';

const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: target,
        secure: false,
    }
]

module.exports = PROXY_CONFIG;
