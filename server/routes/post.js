const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.");
const { createPost, getAllPosts } = require("../controllers/post");
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

router.get("/getAllPosts", auth, getAllPosts);

module.exports = router;
