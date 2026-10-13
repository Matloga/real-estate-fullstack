import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';

export const createInquiry = async (req, res, next) => {
  try {
    const { property, name, email, phone, message } = req.body;

    const exists = await Property.findById(property);
    if (!exists) return res.status(404).json({ message: 'Property not found' });

    const inquiry = await Inquiry.create({
      property,
      sender: req.user?._id,
      name,
      email,
      phone,
      message
    });

    return res.status(201).json(inquiry);
  } catch (error) {
    return next(error);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const filter = {};

    if (req.user.role !== 'admin') {
      const owned = await Property.find({ agent: req.user._id }).select('_id');
      filter.property = { $in: owned.map((p) => p._id) };
    }

    if (req.query.property) filter.property = req.query.property;

    const inquiries = await Inquiry.find(filter)
      .populate('property', 'title price city')
      .sort('-createdAt');

    return res.json({ inquiries });
  } catch (error) {
    return next(error);
  }
};

export const getInquiryById = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).populate('property', 'title price city');
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    return res.json(inquiry);
  } catch (error) {
    return next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    return res.json(inquiry);
  } catch (error) {
    return next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    return res.json({ message: 'Inquiry removed' });
  } catch (error) {
    return next(error);
  }
};
