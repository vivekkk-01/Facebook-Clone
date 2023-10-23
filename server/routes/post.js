const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.");
const { createPost, getAllPosts, reactPost, getReacts } = require("../controllers/post");
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

router.put("/react-post", auth, reactPost);

router.get("/get-reacts/:postId", auth, getReacts);

module.exports = router;
