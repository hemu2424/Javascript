import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, enum: ["home", "work", "other"], default: "home" },
    flatOrBuilding: { type: String, required: true }, // "Flat 402, B Wing"
    locality: { type: String, default: "" },          // area/street from search selection
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: "India" },
    formattedAddress: { type: String, required: true }, // full display string from the search result
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

addressSchema.index({ user: 1 });
addressSchema.index({ location: "2dsphere" });

export default mongoose.model("Address", addressSchema);