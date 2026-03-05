const mongoose = require('mongoose');
const Product = require('../models/product.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exp213';

async function runDemo() {
  await mongoose.connect(MONGO_URI, { dbName: 'exp213' });

  let product = await Product.findOne({ name: 'Premium Headphones' });
  if (!product) {
    console.log('No product found, running seed...');
    await require('./seed');
    product = await Product.findOne({ name: 'Premium Headphones' });
  }

  console.log('Before stock update:');
  console.log(JSON.stringify(await Product.getProductWithAvg(product._id), null, 2));

  // Reduce stock of a variant
  await product.updateStockBySku('HP-BL-001', -2);

  // Increase stock of another variant
  await product.updateStockBySku('HP-WH-001', 5);

  console.log('After stock update:');
  console.log(JSON.stringify(await Product.getProductWithAvg(product._id), null, 2));

  await mongoose.disconnect();
}

runDemo().catch(err => {
  console.error(err);
  process.exit(1);
});
