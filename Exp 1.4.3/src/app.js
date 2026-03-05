import express from "express";
import cors from "cors";
import bookingRoutes from "./modules/booking/booking.route.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health-check endpoint (Railway uses this to verify the app is alive)
app.get('/', (_req, res) => {
    res.json({ status: "ok", service: "redis-locking-mechanism" });
});

app.use('/api', bookingRoutes);

export default app;
