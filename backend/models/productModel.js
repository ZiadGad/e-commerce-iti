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
  ratingAverage: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be above 0'],
    max: [5, 'Rating must be below 5'],
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  ratingSum: {
    type: Number,
    default: 0,
    select: false,
  },
});

productSchema.pre('save', function (next) {
  if (this.ratingCount > 0) {
    this.ratingAverage = parseFloat(
      (this.ratingSum / this.ratingCount).toFixed(2),
    );
  } else {
    this.ratingAverage = 0;
  }
  next();
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
