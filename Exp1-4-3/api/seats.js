import { getAllSeats } from '../src/modules/booking/booking.model.js';
import { connectRedis } from '../src/config/redis.js';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method Not Allowed' });
		return;
	}

	await connectRedis();

	const seats = await getAllSeats();
	res.status(200).json(seats);
}
