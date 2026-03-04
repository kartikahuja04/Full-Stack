import { getAllSeats } from '../src/modules/booking/booking.model.js';

export default function handler(req, res) {
	if (req.method !== 'GET') {
		res.status(405).json({ message: 'Method Not Allowed' });
		return;
	}

	const seats = getAllSeats();
	res.status(200).json(seats);
}
