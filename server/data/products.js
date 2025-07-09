import mongoose from 'mongoose';

const products = [
  // Electronics
  {
    name: "MacBook Pro 16-inch",
    description: "Latest Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD",
    price: 2499.99,
    discount: 5,
    image: "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg",
    category: "Electronics",
    inStock: true,
    rating: 4.9,
    reviews: 245,
    seller: "Apple Store",
    featured: true
  },
  {
    name: "Sony WH-1000XM4",
    description: "Premium noise-cancelling headphones with exceptional sound quality",
    price: 349.99,
    discount: 15,
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg",
    category: "Electronics",
    inStock: true,
    rating: 4.8,
    reviews: 1890,
    seller: "Sony Electronics",
    featured: true
  },
  {
    name: "iPad Pro 12.9",
    description: "Powerful tablet with M1 chip and Liquid Retina XDR display",
    price: 1099.99,
    discount: 0,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    category: "Electronics",
    inStock: true,
    rating: 4.9,
    reviews: 542,
    seller: "Apple Store",
    featured: false
  },
  // Fashion
  {
    name: "Classic Leather Watch",
    description: "Handcrafted leather watch with Swiss movement",
    price: 299.99,
    discount: 0,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    category: "Fashion",
    inStock: true,
    rating: 4.7,
    reviews: 342,
    seller: "LuxeTime",
    featured: false
  },
  {
    name: "Designer Sunglasses",
    description: "Premium UV-protected designer sunglasses",
    price: 199.99,
    discount: 10,
    image: "https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg",
    category: "Fashion",
    inStock: true,
    rating: 4.6,
    reviews: 156,
    seller: "EyeStyle",
    featured: false
  },
  {
    name: "Leather Messenger Bag",
    description: "Premium leather messenger bag for professionals",
    price: 179.99,
    discount: 0,
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg",
    category: "Fashion",
    inStock: true,
    rating: 4.5,
    reviews: 89,
    seller: "BagMaster",
    featured: true
  },
  // Home & Living
  {
    name: "Smart Home Hub",
    description: "Central control for all your smart home devices",
    price: 129.99,
    discount: 0,
    image: "https://images.pexels.com/photos/1668257/pexels-photo-1668257.jpeg",
    category: "Home",
    inStock: true,
    rating: 4.5,
    reviews: 892,
    seller: "SmartLife",
    featured: true
  },
  {
    name: "Ergonomic Office Chair",
    description: "Premium office chair with lumbar support",
    price: 399.99,
    discount: 20,
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
    category: "Home",
    inStock: true,
    rating: 4.7,
    reviews: 567,
    seller: "ErgoComfort",
    featured: false
  },
  {
    name: "Modern Coffee Table",
    description: "Sleek design coffee table with storage",
    price: 249.99,
    discount: 0,
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    category: "Home",
    inStock: true,
    rating: 4.4,
    reviews: 123,
    seller: "HomeStyle",
    featured: false
  },
  // Beauty & Health
  {
    name: "Premium Skincare Set",
    description: "Complete skincare routine with natural ingredients",
    price: 149.99,
    discount: 5,
    image: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg",
    category: "Beauty",
    inStock: true,
    rating: 4.8,
    reviews: 432,
    seller: "NaturalGlow",
    featured: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring",
    price: 199.99,
    discount: 0,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    category: "Beauty",
    inStock: true,
    rating: 4.6,
    reviews: 789,
    seller: "FitTech",
    featured: false
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with alignment lines",
    price: 89.99,
    discount: 0,
    image: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg",
    category: "Beauty",
    inStock: true,
    rating: 4.7,
    reviews: 234,
    seller: "YogaLife",
    featured: false
  }
];

export default products;