import connectDB from '../src/config/db.js';
import Product from '../src/models/Product.js';

let connected = false;
async function ensureDB() {
  if (!connected) {
    await connectDB();
    connected = true;
  }
}

export default async function handler(req, res) {
  try {
    await ensureDB();

    if (req.method === 'GET') {
      const products = await Product.find().lean();
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const created = await Product.create(req.body);
      return res.status(201).json(created);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).send('Method Not Allowed');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
