const mongoose = require("mongoose");

const pitchSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  availableTimes: [{ type: String }], // مثال: ["10:00 AM - 11:00 AM", "4:00 PM - 5:00 PM"]
}, { timestamps: true });

module.exports = mongoose.model("Pitch", pitchSchema);
