import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl
});

let isConnected = false;

redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});

const connectRedis = async () => {
    if (isConnected) return;

    if (!redisClient.isOpen) {
        await redisClient.connect();
    }

    isConnected = true;
    console.log('✅ Redis Connected');
};

export { redisClient, connectRedis };
