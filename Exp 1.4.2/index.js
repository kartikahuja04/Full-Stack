require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongo } = require('./db');
const collectionsRouter = require('./routes/collections');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/collections', collectionsRouter);

const PORT = process.env.PORT || 3000;

async function start() {
	try {
		await connectToMongo();
		app.listen(PORT, () => {
			console.log(`Server listening on port ${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server:', err);
		process.exit(1);
	}
}

start();

