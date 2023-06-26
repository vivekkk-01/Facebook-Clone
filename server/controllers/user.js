const { validateUsername } = require("../helper");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../mailer");
const crypto = require("crypto");

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
    res.status(201).json({
      id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      picture: user.picture,
      verified: user.verified,
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
    if (!user) return res.status(403).json("Invalid Token!");
    if (user.verified) return res.status(403).json("User is already verified!");
    if (!user.accountVerificationTokenExpire > new Date())
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
      accessToken,
    });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};
