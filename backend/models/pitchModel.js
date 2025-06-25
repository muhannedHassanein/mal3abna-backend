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
  availableTimes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Pitch", pitchSchema);
