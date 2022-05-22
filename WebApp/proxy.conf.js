const target = 'https://localhost:7249';

const PROXY_CONFIG = [
    {
        context: [
            "/_configuration",
            "/.well-known",
            "/Identity",
            "/connect",
            "/ApplyDatabaseMigrations",
            "/_framework",
            "/api"
        ],
        target: target,
        secure: false
    }
]

module.exports = PROXY_CONFIG;
