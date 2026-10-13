const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const { protect } = require("../middleware/auth");

router.get("/", protect, favoriteController.getFavorites);
router.post("/", protect, favoriteController.addFavorite);
router.delete("/:id", protect, favoriteController.removeFavorite);

module.exports = router;
