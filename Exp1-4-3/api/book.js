import { bookSeatService } from '../src/modules/booking/booking.service.js';
import { connectRedis } from '../src/config/redis.js';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).json({ message: 'Method Not Allowed' });
		return;
	}

	const { seatId } = req.query;

	if (!seatId) {
		res.status(400).json({ message: 'seatId is required as a query parameter' });
		return;
	}

	await connectRedis();

	const result = await bookSeatService(seatId);
	res.status(result.status).json({ message: result.message });
}
