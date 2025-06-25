const express = require("express");
const router = express.Router();
const { initiatePayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/pay", protect, initiatePayment);

module.exports = router;
