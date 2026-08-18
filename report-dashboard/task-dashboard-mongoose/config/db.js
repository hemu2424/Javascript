const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/task_dashboard";

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.name}`);

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}

module.exports = connectDB;
