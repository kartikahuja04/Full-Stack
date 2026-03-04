import express from 'express';
import bookingRoutes from './modules/booking/booking.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use('/api', bookingRoutes);

// Serve the root index.html from project root so visiting '/' is friendly
app.get('/', (req, res) => {
	const indexPath = path.resolve(__dirname, '..', 'index.html');
	res.sendFile(indexPath, (err) => {
		if (err) {
			res.status(500).send('Error loading page');
		}
	});
});

export default app;
