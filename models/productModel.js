const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product msut have an title'],
    trim: true,
  },
  slug: String,
  price: {
    type: Number,
    required: [true, 'A product msut have an price'],
  },
  description: {
    type: String,
    trim: true,
  },
  images: [String],
  category: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
