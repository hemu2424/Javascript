import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});

function fileFilter(req, file, cb) {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedVideoTypes = ["video/mp4", "video/webm"];

  if (file.fieldname === "images" && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === "video" && allowedVideoTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for field "${file.fieldname}": ${file.mimetype}`), false);
  }
}

const   upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,  },
});

export default upload;