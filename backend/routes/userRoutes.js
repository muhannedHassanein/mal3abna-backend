const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword, 
  updateUserProfile 
} = require("../controllers/userController");

const { upload } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { body, validationResult } = require('express-validator');

// ✅ Validate Middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

// ✅ Register User
router.post(
  '/register',
  upload.single("image"),
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 chars'),
    body('phone').isMobilePhone().withMessage('Enter a valid phone number')
  ]),
  registerUser
);

// ✅ Login
router.post(
  "/login",
  validate([
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
  ]),
  loginUser
);

// ✅ Forgot Password
router.post(
  "/forgot-password",
  validate([
    body('email').isEmail().withMessage('Enter a valid email')
  ]),
  forgotPassword
);

// ✅ Reset Password
router.post(
  "/reset-password",
  validate([
    body('resetToken').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password should be at least 6 chars')
  ]),
  resetPassword
);

// ✅ Update Profile
router.put(
  "/update",
  protect,
  upload.single("image"),
  validate([
    body('email').optional().isEmail().withMessage('Enter a valid email'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password should be at least 6 chars'),
    body('phone').optional().isMobilePhone().withMessage('Enter a valid phone number'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty')
  ]),
  updateUserProfile
);

module.exports = router;
