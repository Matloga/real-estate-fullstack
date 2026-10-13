const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { protect } = require("../middleware/auth");
const { isAgent } = require("../middleware/isAgent");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", propertyController.getAll);
router.get("/:id", propertyController.getById);
router.get("/nearby/search", propertyController.nearby);
router.post("/", protect, isAgent, upload.array("images", 10), propertyController.create);
router.put("/:id", protect, isAgent, propertyController.update);
router.delete("/:id", protect, isAgent, propertyController.remove);

module.exports = router;
