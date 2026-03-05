import express from 'express';
import { bookSeatController } from './booking.controller.js';
import { getAllSeatsController } from './seats.controller.js';
import { insertSeatController } from './seats.controller.js';

const router = express.Router();

router.post('/book/:seatId', bookSeatController);
router.get('/seats', getAllSeatsController);
router.post('/seats', insertSeatController);

export default router;
