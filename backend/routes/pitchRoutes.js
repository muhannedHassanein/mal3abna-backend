const express = require("express");
const router = express.Router();
const {
  createPitch,
  updatePitch,
  deletePitch,
  getAllPitches,
  getPitchById
} = require("../controllers/pitchController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPitch);

router.put("/:id", protect, updatePitch);

router.delete("/:id", protect, deletePitch);

router.get("/", getAllPitches);

router.get("/:id", getPitchById);

module.exports = router;
