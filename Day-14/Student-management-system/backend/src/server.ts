import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("Starting Express...");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Failed to start server");
    console.log("error");
  }
};

startServer();