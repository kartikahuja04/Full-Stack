import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';
import { connectMongo } from './src/config/mongodb.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
	await connectMongo();
	await connectRedis();

	app.listen(PORT, () => {
		console.log(`🚀 Server running on port ${PORT}`);
	});
};

startServer();
