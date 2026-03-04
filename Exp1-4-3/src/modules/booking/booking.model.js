import { redisClient } from '../../config/redis.js';

const SEATS_HASH = 'seats';

// Initialize seats in Redis if not present (idempotent)
const ensureSeatsInitialized = async () => {
    const exists = await redisClient.exists(SEATS_HASH);
    if (!exists) {
        // default 5 seats
        await redisClient.hSet(SEATS_HASH, {
            '1': 'available',
            '2': 'available',
            '3': 'available',
            '4': 'available',
            '5': 'available'
        });
    }
};

const getSeatStatus = async (seatId) => {
    await ensureSeatsInitialized();
    const status = await redisClient.hGet(SEATS_HASH, seatId);
    return status; // null if not exists
};

const bookSeat = async (seatId) => {
    await ensureSeatsInitialized();
    await redisClient.hSet(SEATS_HASH, seatId, 'booked');
};

const getAllSeats = async () => {
    await ensureSeatsInitialized();
    const all = await redisClient.hGetAll(SEATS_HASH);
    // hGetAll returns an object mapping fields to values
    return all;
};

export { getSeatStatus, bookSeat, getAllSeats };
