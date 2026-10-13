const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    location: { type: String, required: true },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
    images: [String],
    propertyType: { type: String, enum: ["house", "apartment", "villa", "plot", "other"], default: "house" },
    type: { type: String, enum: ["sale", "rent"], default: "sale" },
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    furnished: { type: Boolean, default: false },
    readyToMove: { type: Boolean, default: true },
    amenities: [String],
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

propertySchema.index({ coordinates: "2dsphere" });
propertySchema.index({ title: "text", location: "text", description: "text" });

module.exports = mongoose.model("Property", propertySchema);
