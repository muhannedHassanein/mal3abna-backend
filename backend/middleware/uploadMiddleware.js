const multer = require("multer");
const path = require("path");

// ✅ تخزين الصور في مجلد uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// ✅ فلترة الملفات المسموح بها (صور فقط)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, PNG images are allowed"));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// ✅ إعداد الميدل وير
const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = { upload };
