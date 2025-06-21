const express = require("express");
const router = express.Router();
const { addPitch } = require("../controllers/pitchController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addPitch);

module.exports = router;
