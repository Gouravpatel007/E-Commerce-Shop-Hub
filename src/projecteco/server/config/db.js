import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from '../data/products.js';
import Product from '../models/productModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/projecteco');
    console.log(`MongoDB Connected successfully`);//: ${conn.connection.host}`);

    // Check if products exist
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      // Seed products
      await Product.insertMany(products);
      console.log('Products seeded successfully');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;