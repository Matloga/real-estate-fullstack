const express = require("express");
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");
const { protect } = require("../middleware/auth");
const { isAgent } = require("../middleware/isAgent");

router.post("/", protect, inquiryController.create);
router.get("/me", protect, inquiryController.getMyInquiries);
router.get("/property/:id", protect, isAgent, inquiryController.getForProperty);
router.patch("/:id/status", protect, isAgent, inquiryController.updateStatus);

module.exports = router;
