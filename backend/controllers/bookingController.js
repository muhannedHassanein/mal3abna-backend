const Booking = require("../models/bookingModel");
const Pitch = require("../models/pitchModel");

const createBooking = async (req, res) => {
  const { pitchId, date, time } = req.body;

  try {
    const pitch = await Pitch.findById(pitchId);
    if (!pitch) {
      return res.status(404).json({ message: "Pitch not found" });
    }

    // تحقق إذا الوقت محجوز بالفعل
    const existingBooking = await Booking.findOne({ pitch: pitchId, date, time });
    if (existingBooking) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      pitch: pitchId,
      date,
      time,
      price: pitch.pricePerHour
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("pitch", "name location");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings
};
