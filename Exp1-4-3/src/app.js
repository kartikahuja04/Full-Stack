import express from 'express';
import bookingRoutes from './modules/booking/booking.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use('/api', bookingRoutes);


// Serve a simple API message at root
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Booking API is running. See /api/seats and /api/book endpoints.' });
});

export default app;
