const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// مسار الصور
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// الراوتات
app.use("/api/users", require("../routes/userRoutes"));

// راوت افتراضي للتجربة
app.get("/", (req, res) => {
  res.send("API is running from Vercel 🚀");
});

// ❌ ممنوع تستخدم app.listen مع Vercel
// ✅ بدل كده نرجّع التطبيق
module.exports = app;
