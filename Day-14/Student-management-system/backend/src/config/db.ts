import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB");
    console.error(error);
    throw error;
  }
};

export default connectDB;