import mongoose from 'mongoose';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

async function run() {
  await mongoose.connect(MONGO_URI);

  // clear existing
  await Product.deleteMany({});
  await Category.deleteMany({});

  // create products
  const p1 = await Product.create({ name: 'Premium Headphones', description: 'High quality sound', price: 199.99, sku: 'HP-BL-001' });
  const p2 = await Product.create({ name: 'Wireless Mouse', description: 'Ergonomic mouse', price: 49.99, sku: 'WM-001' });

  // create category and subcategory
  const electronics = await Category.create({ name: 'Electronics', description: 'Electronic devices', products: [p1._id] });
  const accessories = await Category.create({ name: 'Accessories', description: 'Device accessories', products: [p2._id] });

  // link subcategory
  electronics.subcategories.push(accessories._id);
  await electronics.save();

  console.log('Seed complete. Sample documents:');
  console.log('Product:', JSON.stringify(await Product.find().lean(), null, 2));
  console.log('Category:', JSON.stringify(await Category.find().populate('subcategories products').lean(), null, 2));

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
