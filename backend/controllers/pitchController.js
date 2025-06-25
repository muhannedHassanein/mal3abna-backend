const Pitch = require("../models/pitchModel");

const createPitch = async (req, res) => {
  try {
    const { name, location, pricePerHour, availableTimes } = req.body;

    const pitch = await Pitch.create({
      owner: req.user._id,
      name,
      location,
      pricePerHour,
      availableTimes
    });

    res.status(201).json(pitch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePitch = async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id);

    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }

    if (pitch.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    pitch.name = req.body.name || pitch.name;
    pitch.location = req.body.location || pitch.location;
    pitch.pricePerHour = req.body.pricePerHour || pitch.pricePerHour;
    pitch.availableTimes = req.body.availableTimes || pitch.availableTimes;

    const updatedPitch = await pitch.save();

    res.json(updatedPitch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePitch = async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id);

    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }

    if (pitch.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await pitch.deleteOne();

    res.json({ message: "Pitch removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllPitches = async (req, res) => {
  try {
    const pitches = await Pitch.find().populate("owner", "name email");
    res.json(pitches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPitchById = async (req, res) => {
  try {
    const pitch = await Pitch.findById(req.params.id).populate("owner", "name email");
    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }
    res.json(pitch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPitch,
  updatePitch,
  deletePitch,
  getAllPitches,
  getPitchById
};
