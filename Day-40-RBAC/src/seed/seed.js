import "dotenv/config";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Product from "../models/Products.js";
import { connectDB } from "../config/db.js";



const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");

    await User.deleteMany({});
    await Product.deleteMany({});

    // Hash passwords
    const adminPassword = await bcrypt.hash("Admin@123", 12);
    const userPassword = await bcrypt.hash("User@123", 12);

    // Create users
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: adminPassword,
        role: "admin",
        isActive: true,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: userPassword,
        role: "user",
        isActive: true,
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        password: userPassword,
        role: "user",
        isActive: true,
      },
    ]);

    console.log(`${users.length} users created`);

    // Create products
    const products = await Product.create([
      {
        name: "iPhone 17",
        description: "Latest Apple smartphone with powerful performance",
        price: 79999,
        stock: 20,
        category: "Electronics",
        image: "https://example.com/iphone.jpg",
        isActive: true,
      },
      {
        name: "MacBook Air",
        description: "Lightweight laptop with excellent battery life",
        price: 99999,
        stock: 15,
        category: "Electronics",
        image: "https://example.com/macbook.jpg",
        isActive: true,
      },
      {
        name: "Nike Air Max",
        description: "Comfortable running shoes for everyday use",
        price: 8999,
        stock: 30,
        category: "Footwear",
        image: "https://example.com/nike.jpg",
        isActive: true,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard for gaming and programming",
        price: 4999,
        stock: 25,
        category: "Accessories",
        image: "https://example.com/keyboard.jpg",
        isActive: true,
      },
    ]);

    console.log(`${products.length} products created`);

    console.log("Database seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();