import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    cuisine: {
      type: String,
      default: "General",
    },
    address: {
      type: String,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    video: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

 const Resturants =   mongoose.model("Restaurant", restaurantSchema);

 export default Resturants