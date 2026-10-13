import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'change_me', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

const sanitize = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  avatar: user.avatar
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role });
    return res.status(201).json({ user: sanitize(user), token: signToken(user._id) });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json({ user: sanitize(user), token: signToken(user._id) });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return res.json({ user: req.user });
  } catch (error) {
    return next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, avatar },
      { new: true, runValidators: true }
    ).select('-password');
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
};
