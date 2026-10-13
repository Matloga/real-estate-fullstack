const Inquiry = require("../models/Inquiry");

exports.create = async (req, res, next) => {
  try {
    const { property, message } = req.body;
    const inquiry = await Inquiry.create({ property, sender: req.user.id, message });
    res.status(201).json(inquiry);
  } catch (err) {
    next(err);
  }
};

exports.getMyInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({ sender: req.user.id }).populate("property", "title");
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
};

exports.getForProperty = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find({ property: req.params.id }).populate("sender", "name email");
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ message: "Not found" });
    res.json(inquiry);
  } catch (err) {
    next(err);
  }
};
