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
} = require("../controllers/user");

const auth = require("../middlewares/auth.");

const {
  uploadImage,
  validateProfilePicture,
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

router.get("/get-profile/:username", auth, getProfile);

router.post("/get-all-images", auth, getAllImages);

router.put(
  "/update-profile-picture",
  auth,
  uploadImage.single("image"),
  validateProfilePicture,
  updateProfilePicture
);

module.exports = router;
