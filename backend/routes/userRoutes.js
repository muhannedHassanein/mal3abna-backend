const express = require("express");
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/userController");
const { upload } = require("../middleware/uploadMiddleware");

router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); // ✅ كده صح
router.post("/reset-password", resetPassword);

const { updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.put("/update", protect, upload.single("image"), updateUserProfile);


module.exports = router;
