import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
    console.error('Redis Error:', err);
});

const connectRedis = async () => {
    await redisClient.connect();
    console.log('✅ Redis Connected');
};

export { redisClient, connectRedis };
