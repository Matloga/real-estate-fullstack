const User = require("../models/User");

exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites || []);
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorites: propertyId } });
    res.json({ message: "Added to favorites" });
  } catch (err) {
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: req.params.id } });
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    next(err);
  }
};
