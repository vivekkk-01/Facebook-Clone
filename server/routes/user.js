const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  postRegister,
  postActivate,
  postLogin,
  resendVerification,
  findUser,
  resetPasswordOTP,
  verifyOTP,
  postResetPassword,
  getProfile,
  getAllImages,
  updateProfilePicture,
  updateCoverPicture,
  updateDetails,
  addRequest,
  cancelRequest,
  follow,
  unFollow,
  acceptRequest,
  unFriend,
  rejectRequest,
  searchUser,
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  getFriendsInfo,
} = require("../controllers/user");

const auth = require("../middlewares/auth.");

const {
  uploadImage,
  validateProfilePicture,
  validateCoverPicture,
} = require("../middlewares/imageUpload");

router.post(
  "/register",
  [
    body("first_name")
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage("First Name must be between 3 and 30 characters."),
    body("last_name")
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage("Last Name must be between 3 and 30 characters."),
    body("email").trim().isEmail().withMessage("Enter a valid email address."),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 8, max: 30 })
      .withMessage("Password must contain at least 8 characters."),
    body("gender")
      .trim()
      .notEmpty()
      .isIn(["Male", "Female", "Other"])
      .withMessage("Gender is required."),
  ],
  postRegister
);

router.post("/activate", auth, postActivate);

router.post("/login", postLogin);

router.post("/resend-verification", auth, resendVerification);

router.get("/find-user/:email", findUser);

router.post("/reset-password-otp", resetPasswordOTP);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", postResetPassword);

router.get("/get-profile/:username", getProfile);

router.post("/get-all-images", getAllImages);

router.put(
  "/update-profile-picture",
  auth,
  uploadImage.single("image"),
  validateProfilePicture,
  updateProfilePicture
);

router.put(
  "/update-cover-picture",
  auth,
  uploadImage.single("image"),
  validateCoverPicture,
  updateCoverPicture
);

router.put("/update-details", auth, updateDetails);

router.put("/add-friend/:id", auth, addRequest);

router.put("/cancel-friend/:id", auth, cancelRequest);

router.put("/follow/:id", auth, follow);

router.put("/un-follow/:id", auth, unFollow);

router.put("/accept-request/:id", auth, acceptRequest);

router.put("/un-friend/:id", auth, unFriend);

router.put("/reject-request/:id", auth, rejectRequest);

router.get("/search/:searchTerm", searchUser);

router.put("/add-to-search-history", auth, addToSearchHistory);

router.get("/get-search-history", auth, getSearchHistory);

router.delete("/delete-from-search/:searchUser", auth, removeFromSearch);

router.get("/get-friends-info", auth, getFriendsInfo);

module.exports = router;
