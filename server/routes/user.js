const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  postRegister,
  postActivate,
  postLogin,
  postAuth,
  resendVerification,
} = require("../controllers/user");
const auth = require("../middlewares/auth.");

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
module.exports = router;
