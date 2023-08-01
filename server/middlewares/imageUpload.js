const multer = require("multer");
const storage = multer.memoryStorage();
const fs = require("fs");
const path = require("path");

const imageFileFilter = (req, file, cb) => {
  cb(null, true);
};

const uploadImage = multer({ storage, fileFilter: imageFileFilter });

const validatePostImages = async (req, res, next) => {
  req.files.length > 0 &&
    req.files.forEach((file) => {
      if (!file.mimetype.startsWith("image"))
        return res.status(403).json("Please provide an image.");
    });
  req.files.length > 0 &&
    req.files.forEach((file) => {
      if (file.size > 5000000)
        return res.status(403).json("Image size is too large.");
    });

  req.files.forEach((file, i) => {
    req.files[i].filename = `post-${Date.now()}-${file.originalname}`;
    fs.writeFile(
      path.join(`public/uploads/images/${file.filename}`),
      file.buffer,
      (err) => {
        if (err) {
          next(err);
        }
      }
    );
  });

  next();
};

const validateProfilePicture = async (req, res, next) => {
  if (!req.file.mimetype.startsWith("image"))
    return res.status(403).json("Please provide an image.");

  if (req.file.size > 5000000)
    return res.status(403).json("Image size is too large.");

  req.file.filename = `profile-${Date.now()}-${req.file.originalname}`;

  fs.writeFile(
    path.join(`public/uploads/profilePicture/${req.file.filename}`),
    req.file.buffer,
    (err) => {
      if (err) {
        next(err);
      }
    }
  );
  next();
};

module.exports = { uploadImage, validatePostImages, validateProfilePicture };
