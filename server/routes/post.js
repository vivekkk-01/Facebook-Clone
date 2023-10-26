const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.");
const {
  createPost,
  getAllPosts,
  reactPost,
  getReacts,
  addComment,
} = require("../controllers/post");
const {
  uploadImage,
  validatePostImages,
  validateCommentImage,
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

router.post(
  "/post-comment",
  auth,
  uploadImage.single("image"),
  validateCommentImage,
  addComment
);

module.exports = router;
