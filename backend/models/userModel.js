const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "owner"], default: "user" },
  image: { type: String, default: "" },
  resetToken: { type: String },
resetTokenExpire: { type: Date }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
