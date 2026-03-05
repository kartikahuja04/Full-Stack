import { createClient } from 'redis';

// Railway may use REDIS_PRIVATE_URL or REDIS_URL
const redisUrl = process.env.REDIS_PRIVATE_URL || process.env.REDIS_URL || 'redis://localhost:6379';

console.log(`🔗 Redis URL configured: ${redisUrl.replace(/\/\/.*@/, '//***@')}`);

const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (err) => {
    console.error('Redis Error:', err.message);
});

redisClient.on('connect', () => {
    console.log('✅ Redis Connected');
});

const connectRedis = async (retries = 5, delay = 3000) => {
    for (let i = 1; i <= retries; i++) {
        try {
            await redisClient.connect();
            return;
        } catch (err) {
            console.error(`❌ Redis connection attempt ${i}/${retries} failed: ${err.message}`);
            if (i === retries) {
                console.error('⚠️ Could not connect to Redis after all retries. Server will start but booking will fail.');
                return;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

export { redisClient, connectRedis };
