const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pitch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pitch",
    required: true
  },
  date: {
    type: String,
    required: true // مثلاً "2025-06-22"
  },
  time: {
    type: String,
    required: true // مثلاً "4:00 PM - 5:00 PM"
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
