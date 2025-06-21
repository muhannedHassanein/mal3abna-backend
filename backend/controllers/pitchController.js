const Pitch = require("../models/pitchModel");

const addPitch = async (req, res) => {
  const { name, location, pricePerHour, availableTimes } = req.body;

  try {
    const pitch = await Pitch.create({
      owner: req.user._id,
      name,
      location,
      pricePerHour,
      availableTimes
    });

    res.status(201).json(pitch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPitch };
