const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name must be at most 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (val) {
        return /^01[0-2,5]{1}[0-9]{8}$/.test(val); // رقم مصري
      },
      message: "Please provide a valid Egyptian phone number"
    }
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user"
  },
  image: {
    type: String,
    default: ""
  },
  resetToken: String,
  resetTokenExpire: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
