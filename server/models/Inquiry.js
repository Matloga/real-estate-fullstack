import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
