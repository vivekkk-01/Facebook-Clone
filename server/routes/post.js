const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.");
const {
  createPost,
  getAllPosts,
  reactPost,
  getReacts,
  addComment,
  savePost,
  deletePost,
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

router.get("/getAllPosts", getAllPosts);

router.put("/react-post", auth, reactPost);

router.get("/get-reacts/:postId", getReacts);

router.post(
  "/post-comment",
  auth,
  uploadImage.single("image"),
  validateCommentImage,
  addComment
);

router.put("/save-post/:postId", auth, savePost);

router.delete("/delete-post/:postId", auth, deletePost);

module.exports = router;
