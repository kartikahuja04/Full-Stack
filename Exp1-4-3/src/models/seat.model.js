import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  seatId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['available', 'booked'], default: 'available' }
});

export const Seat = mongoose.model('Seat', seatSchema);
