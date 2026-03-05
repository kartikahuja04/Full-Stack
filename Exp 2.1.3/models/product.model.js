const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  color: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 }
}, { _id: false });

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  variants: { type: [VariantSchema], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
  avgRating: { type: Number, default: 0 }
}, { timestamps: true });

// Indexes for fast lookups and text search
ProductSchema.index({ name: 'text', category: 1 });
ProductSchema.index({ 'variants.sku': 1 });

// Recalculate avgRating whenever a product is saved
ProductSchema.pre('save', function (next) {
  if (this.reviews && this.reviews.length) {
    const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.avgRating = Math.round((sum / this.reviews.length) * 100) / 100;
  } else {
    this.avgRating = 0;
  }
  next();
});

// Instance method: update stock for a variant by SKU (delta may be negative)
ProductSchema.methods.updateStockBySku = async function (sku, delta) {
  const variant = this.variants.find(v => v.sku === sku);
  if (!variant) throw new Error('Variant not found');
  variant.stock = Math.max(0, (variant.stock || 0) + delta);
  await this.save();
  return variant;
};

// Static: aggregate product with computed avgRating (from reviews) and project variants
ProductSchema.statics.getProductWithAvg = async function (productId) {
  const objId = mongoose.Types.ObjectId(productId);
  const res = await this.aggregate([
    { $match: { _id: objId } },
    { $addFields: { avgRating: { $cond: [{ $gt: [{ $size: '$reviews' }, 0] }, { $avg: '$reviews.rating' }, 0] } } },
    { $project: { name: 1, category: 1, variants: 1, reviews: 1, avgRating: { $round: ['$avgRating', 2] } } }
  ]);
  return res[0] || null;
};

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
