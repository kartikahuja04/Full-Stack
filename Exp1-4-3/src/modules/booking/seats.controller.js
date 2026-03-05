import { ensureSeatsInitialized } from './booking.model.js';
import { Seat } from '../../models/seat.model.js';
export const getAllSeatsController = async (req, res) => {
  await ensureSeatsInitialized();
  const seats = await Seat.find();
  res.status(200).json(seats);
};

export const insertSeatController = async (req, res) => {
  try {
    const { seatId, status } = req.body;
    const seat = new Seat({ seatId, status });
    await seat.save();
    res.status(201).json({ message: 'Seat inserted', seat });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};