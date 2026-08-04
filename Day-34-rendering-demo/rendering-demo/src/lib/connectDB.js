import mongoose from "mongoose"

const DB_URI = "mongodb://localhost:27017/next-crud";

await mongoose.connect(DB_URI );

mongoose.connect(DB_URI);
console.log("MongoDB connected successfully");

const db = mongoose.connection.db;

export default db;