import { redisClient } from '../../config/redis.js';

const SEATS_HASH = 'seats';

// Initialize seats in Redis if not present (idempotent)
import { Seat } from '../../models/seat.model.js';

// Initialize seats in MongoDB if not present
export const ensureSeatsInitialized = async () => {
    const count = await Seat.countDocuments();
    if (count === 0) {
        await Seat.insertMany([
            { seatId: '1', status: 'available' },
            { seatId: '2', status: 'available' },
            { seatId: '3', status: 'available' },
            { seatId: '4', status: 'available' },
            { seatId: '5', status: 'available' }
        ]);
    }
};

const getSeatStatus = async (seatId) => {
    await ensureSeatsInitialized();
    const seat = await Seat.findOne({ seatId });
    return seat ? seat.status : null;
};

const bookSeat = async (seatId) => {
    await ensureSeatsInitialized();
    await Seat.updateOne({ seatId }, { status: 'booked' });
};

const getAllSeats = async () => {
    await ensureSeatsInitialized();
    const all = await redisClient.hGetAll(SEATS_HASH);
    // hGetAll returns an object mapping fields to values
    return all;
};

export { getSeatStatus, bookSeat, getAllSeats };
