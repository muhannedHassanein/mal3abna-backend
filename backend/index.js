const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const pitchRoutes = require("./routes/pitchRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pitches", pitchRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/pitches", require("./routes/pitchRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API is running......");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
