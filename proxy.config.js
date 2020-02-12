const PROXY_CONFIG = [
    {
    context: [
    "/v1/dm",
    "/v1",
    "/dm",
    '/v1/bulk-message'
    ],
    target: "https://api.moya.app",
    secure: false },
    ];
module.exports = PROXY_CONFIG;
