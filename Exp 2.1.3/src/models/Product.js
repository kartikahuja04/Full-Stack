import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Variant subdocument schema
const VariantSchema = new Schema({
  sku: { type: String, required: true, unique: true },
  color: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
}, { _id: false });

// Review subdocument schema
const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
}, { timestamps: true, _id: false });

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  description: { type: String },
  category: { type: String, index: true },
  variants: [VariantSchema],
  reviews: [ReviewSchema],
  avgRating: { type: Number, default: 0 },
}, { timestamps: true });

// Index for fast lookup by category and name
ProductSchema.index({ category: 1, name: 1 });

// Aggregation method to calculate average rating
ProductSchema.statics.calculateAvgRating = async function(productId) {
  const product = await this.findById(productId);
  if (!product || !product.reviews.length) return 0;
  const avg = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
  product.avgRating = avg;
  await product.save();
  return avg;
};

// Stock update method for a variant
ProductSchema.methods.updateStock = async function(sku, newStock) {
  const variant = this.variants.find(v => v.sku === sku);
  if (!variant) throw new Error('Variant not found');
  variant.stock = newStock;
  await this.save();
  return variant;
};

export default model('Product', ProductSchema);
