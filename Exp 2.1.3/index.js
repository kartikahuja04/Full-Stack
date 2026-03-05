// Entry point: run demo (connects using MONGODB_URI env var or localhost)
import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/db.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('E-commerce catalog API is running'));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => {
	console.error('Failed to connect to DB:', err.message);
});
