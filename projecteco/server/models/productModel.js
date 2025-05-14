import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  reviews: {
    type: Number,
    required: true,
    default: 0
  },
  seller: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;