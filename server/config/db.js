import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from '../data/products.js'
import Product from '../models/productModel.js'

dotenv.config()

const connectDB = async () => {
  try {
    // ⛔ Removed fallback to localhost
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

    const productCount = await Product.countDocuments()
    if (productCount === 0) {
      await Product.insertMany(products)
      console.log('✅ Products seeded successfully')
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
