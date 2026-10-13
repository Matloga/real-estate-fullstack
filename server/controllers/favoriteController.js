import User from '../models/User.js';

export const getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    return res.json({ favorites: user.favorites });
  } catch (error) {
    return next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { favorites: req.params.propertyId }
    });
    const user = await User.findById(req.user._id).populate('favorites');
    return res.status(201).json({ favorites: user.favorites });
  } catch (error) {
    return next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { favorites: req.params.propertyId }
    });
    const user = await User.findById(req.user._id).populate('favorites');
    return res.json({ favorites: user.favorites });
  } catch (error) {
    return next(error);
  }
};
