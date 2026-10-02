const cache = {};
const TTL = 60 * 1000;

function clearCache() {
    for (const key in cache) {
        delete cache[key];
    }
}

function cacheMiddleware(req, res, next) {
    const key = req.originalUrl || req.url;
    const cached = cache[key];

    if (cached) {
        if (Date.now() - cached.createdAt < TTL) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cached.data);
        }
        delete cache[key];
    }

    res.setHeader('X-Cache', 'MISS');

    const originalJson = res.json.bind(res);
    res.json = (data) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = { data, createdAt: Date.now() };
        }
        return originalJson(data);
    };

    next();
}

module.exports = { cache, cacheMiddleware, clearCache };
