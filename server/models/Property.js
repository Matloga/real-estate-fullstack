import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: [true, 'Price is required']
    },
    type: {
      type: String,
      enum: ['house', 'apartment', 'land', 'commercial'],
      default: 'house'
    },
    status: {
      type: String,
      enum: ['for-sale', 'for-rent', 'sold'],
      default: 'for-sale'
    },
    bedrooms: {
      type: Number,
      default: 0
    },
    bathrooms: {
      type: Number,
      default: 0
    },
    area: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 }
    },
    images: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', description: 'text', city: 'text' });

const Property = mongoose.model('Property', propertySchema);

export default Property;
