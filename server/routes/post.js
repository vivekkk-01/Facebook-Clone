const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.");
const { createPost } = require("../controllers/post");
const {
  uploadImage,
  validatePostImages,
} = require("../middlewares/imageUpload");

router.post(
  "/create",
  auth,
  uploadImage.array("images"),
  validatePostImages,
  createPost
);

module.exports = router;
