import { Router, Request } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import crypto from "crypto";

import checkAuth from "../utils/checkAuth";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    callback(null, "uploads");
  },

  filename: (_, file, callback) => {
    const extension = path.extname(file.originalname);
    callback(null, `${crypto.randomUUID()}${extension}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
    return callback(new Error("Unsupported file type"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

const router = Router();

router.post("/", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file?.filename}`,
  });
});

export default router;
