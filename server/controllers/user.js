const { validateUsername } = require("../helper");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail, sendPasswordResetOTP } = require("../mailer");
const crypto = require("crypto");
const path = require("path");
const { unlink } = require("fs");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

exports.postRegister = async (req, res) => {
  try {
    let error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    const {
      first_name,
      last_name,
      password,
      email,
      gender,
      birth_year,
      birth_month,
      birth_day,
    } = req.body;

    const isUser = await User.findOne({ email });
    if (isUser)
      return res.status(403).json("User with this email already exists!");
    const hashedPassword = await bcrypt.hash(password, 10);
    const username = await validateUsername(first_name + last_name);
    const user = await User.create({
      first_name,
      last_name,
      username,
      password: hashedPassword,
      email,
      gender,
      birth_year,
      birth_month,
      birth_day,
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.accountVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    user.accountVerificationTokenExpire = Date.now() + 30 * 60 * 1000;

    await user.save();
    const url = `http://localhost:3000/activate/${verificationToken}`;
    await sendVerificationEmail(user, url);
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.status(201).json({
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      picture: user.picture,
      verified: user.verified,
      accessToken,
      message: "We sent you a verification email. Check your mailbox!",
    });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.postActivate = async (req, res) => {
  try {
    const { token } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ accountVerificationToken: hashedToken });
    if (user._id.toString() !== req.user._id.toString())
      return res.status(403).json("You are not authorized!");
    if (!user) return res.status(403).json("Invalid Token!");
    if (user.verified) return res.status(403).json("User is already verified!");
    if (user.accountVerificationTokenExpire < new Date())
      return res.status(401).json("Token is expired, try again later.");

    user.isAccountVerified = true;
    user.accountVerificationToken = undefined;
    user.accountVerificationTokenExpire = undefined;
    user.verified = true;
    await user.save();
    return res.json("Account verified successfully!");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("Invalid credentials!");
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(400).json("Invalid credentials!");
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.json({
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      picture: user.picture,
      verified: user.verified,
      accessToken,
    });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("User not Found!");
    if (user.verified) return res.status(403).json("User is already verified!");
    if (user.accountVerificationTokenExpire > new Date())
      return res
        .status(403)
        .json(
          "We've already sent you a verification email. Check your mailbox!"
        );
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.accountVerificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    user.accountVerificationTokenExpire = Date.now() + 30 * 60 * 1000;

    await user.save();
    const url = `http://localhost:3000/activate/${verificationToken}`;
    await sendVerificationEmail(user, url);
    return res.json("We sent a verification email to your email address!");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json("Account doesn't exist!");
    return res.json({ picture: user.picture, email: user.email });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.resetPasswordOTP = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("Account doesn't exist!");
    if (user.passwordResetOTPExpire > new Date())
      return res
        .status(403)
        .json("We've already sent you an OTP! Check your mailbox!");
    let OTP = "";
    for (let i = 0; i < 5; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    const securedOTP = await bcrypt.hash(OTP, 10);
    user.passwordResetOTP = securedOTP;
    user.passwordResetOTPExpire = Date.now() + 30 * 60 * 1000;
    await user.save();
    await sendPasswordResetOTP(user, OTP);
    return res.json("We've sent you an OTP! Check your mailbox!");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { OTP, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("Account Not Found!");
    if (!user.passwordResetOTP)
      return res.status(403).json("We haven't sent you an OTP!");
    const isCorrectOTP = await bcrypt.compare(OTP, user.passwordResetOTP);
    if (!isCorrectOTP) return res.status(404).json("Enter a correct OTP!");
    if (user.passwordResetOTPExpire < new Date())
      return res.status(403).json("OTP has expired. Try again!");
    await user.save();
    return res.json("Correct OTP");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, email, OTP } = req.body;
    if (password !== confirmPassword)
      return res.status(401).json("Passwords must match!");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User Not Found!");
    const isCorrectOTP = await bcrypt.compare(OTP, user.passwordResetOTP);
    if (!isCorrectOTP) return res.status(404).json("Enter a correct OTP!");
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetOTP = null;
    user.passwordResetOTPExpire = null;
    await user.save();
    return res.json("You successfully changed your password!");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    const posts = await Post.find({ user: profile._id }).populate("user");
    if (!profile) return res.status(403).json("Profile Not Found!");
    return res.json({ ...profile.toObject(), posts });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getAllImages = async (req, res) => {
  const { path, max } = req.body;
  try {
    cloudinary.v2.api.resources(
      {
        type: "upload",
        prefix: path, // add your folder
        max_results: max,
      },
      function (error, result) {
        if (error) throw new Error(error);
        res.status(200).json(result);
      }
    );
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password"
    );
    const { path: imagePath } = req.body;
    const filePath = path.join(
      `public/uploads/profilePicture/${req.file.filename}`
    );
    const { secure_url } = await cloudinary.v2.uploader.upload(filePath, {
      folder: imagePath ? imagePath : null,
    });

    user.picture = secure_url;
    await user.save();
    unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
    const posts = await Post.find({ user: user._id }).populate("user");
    return res.json({ ...user.toObject(), posts });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};
