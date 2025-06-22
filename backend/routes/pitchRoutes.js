const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addPitch } = require("../controllers/pitchController");

// إضافة ملعب جديد (يحتاج توكن)
router.post("/add", protect, addPitch);

module.exports = router;
