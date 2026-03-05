import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../config/redis.js';

const acquireLock = async (key, ttl = 10) => {
    if (!redisClient.isOpen) {
        console.error('⚠️ Redis not connected, cannot acquire lock');
        return null;
    }
    const lockValue = uuidv4();
    const result = await redisClient.set(key, lockValue, {
        NX: true,
        EX: ttl
    });
    if (!result) return null;
    return lockValue;
};

const releaseLock = async (key, lockValue) => {
    if (!redisClient.isOpen) {
        console.error('⚠️ Redis not connected, cannot release lock');
        return;
    }
    const storedValue = await redisClient.get(key);
    if (storedValue === lockValue) {
        await redisClient.del(key);
    }
};

export { acquireLock, releaseLock };
