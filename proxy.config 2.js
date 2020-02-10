const PROXY_CONFIG = [
    {
    context: [
    "/v1/dm",
    "/v1",
    "/dm",
    ],
    target: "https://api.moya.app",
    secure: false
    }
    ]
    module.exports = PROXY_CONFIG;