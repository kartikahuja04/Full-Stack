import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

const PORT = process.env.PORT || 3000;

// Graceful error handling
process.on('uncaughtException', (err) => {
	console.error('❌ Uncaught Exception:', err);
	process.exit(1);
});

process.on('unhandledRejection', (reason) => {
	console.error('❌ Unhandled Rejection:', reason);
	process.exit(1);
});

const startServer = async () => {
	await connectRedis();
	app.listen(PORT, '0.0.0.0', () => {
		console.log(`🚀 Server running on port ${PORT}`);
	});
};

startServer();
