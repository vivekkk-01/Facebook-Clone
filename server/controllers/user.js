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
const { default: mongoose } = require("mongoose");

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
    if (req.headers.id) {
      const profile = await User.findOne({ username }).select("-password");
      const me = await User.findById(req.headers.id);
      const ifItsMe = profile._id.toString() === me._id.toString();
      const relation = {
        friends: false,
        following: false,
        requestSent: false,
        requestReceived: false,
      };

      if (!ifItsMe) {
        if (
          profile.friends.includes(me._id) &&
          me.friends.includes(profile._id)
        )
          relation.friends = true;
        if (me.followings.includes(profile._id)) relation.following = true;
        if (profile.requests.includes(me._id)) relation.requestSent = true;
        if (me.requests.includes(profile._id)) relation.requestReceived = true;
      }
      const posts = await Post.find({ user: profile._id })
        .populate("user")
        .populate("comments.commentBy", "first_name last_name username picture")
        .sort({ createdAt: -1 });
      if (!profile) return res.status(403).json("Profile Not Found!");
      await profile.populate(
        "friends",
        "last_name first_name username picture"
      );
      return res.json({ ...profile.toObject(), posts, relation });
    } else {
      const profile = await User.findOne({ username }).select("-password");
      const posts = await Post.find({ user: profile._id })
        .populate("user")
        .populate("comments.commentBy", "first_name last_name username picture")
        .sort({ createdAt: -1 });
      if (!profile) return res.status(403).json("Profile Not Found!");
      await profile.populate(
        "friends",
        "last_name first_name username picture"
      );
      return res.json({ ...profile.toObject(), posts });
    }
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getAllImages = async (req, res) => {
  const { path, max } = req.body;
  try {
    await cloudinary.v2.api.resources(
      {
        type: "upload",
        prefix: path, // add your folder
        max_results: max,
      },
      function (error, result) {
        if (error) {
          return res
            .status(403)
            .json("Something went wrong, please try again!");
        }
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
    const user = await User.findById(req.user._id).select("-password");
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

exports.updateCoverPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const { path: imagePath } = req.body;
    const filePath = path.join(
      `public/uploads/coverPicture/${req.file.filename}`
    );
    const { secure_url } = await cloudinary.v2.uploader.upload(filePath, {
      folder: imagePath ? imagePath : null,
    });

    user.cover = secure_url;
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

exports.updateDetails = async (req, res) => {
  try {
    const { details } = req.body;
    const { _id } = req.user;
    const updated = await User.findByIdAndUpdate(
      _id,
      { details },
      { new: true }
    );
    return res.json(updated.details);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.addRequest = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json("You couldn't send a friend request to yourself!");
    }
    const receiver = await User.findById(req.params.id);
    const sender = await User.findById(req.user._id);
    if (receiver.friends.includes(sender._id))
      return res
        .status(400)
        .json(`${receiver.first_name} is already in your friends list!`);
    if (receiver.requests.includes(sender._id))
      return res.status(400).json("Request already sent!");
    await receiver.updateOne({ $push: { requests: sender._id } });
    await receiver.updateOne({ $push: { followers: sender._id } });
    await sender.updateOne({ $push: { followings: receiver._id } });
    return res.json("Friend request sent successfully.");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("Error!");
    }
    const receiver = await User.findById(req.params.id);
    const sender = await User.findById(req.user._id);
    if (
      !receiver.followers.includes(sender._id) &&
      !sender.followings.includes(receiver._id)
    )
      return res.status(400).json(`Error cancelling the request!`);
    if (!receiver.requests.includes(sender._id))
      return res.status(400).json("Error cancelling  the request!");
    await receiver.updateOne({ $pull: { requests: sender._id } });
    await receiver.updateOne({ $pull: { followers: sender._id } });
    await sender.updateOne({ $pull: { followings: receiver._id } });
    return res.json("Friend request cancelled successfully.");
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.follow = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("You can't follow yourself!");
    }
    const receiver = await User.findById(req.params.id);
    const sender = await User.findById(req.user._id);
    if (receiver.requests.includes(sender._id))
      return res.status(400).json("Error while accepting the request!");

    if (
      receiver.followers.includes(sender._id) &&
      sender.followings.includes(receiver._id)
    ) {
      return res.status(400).json(`You already follow ${receiver.first_name}`);
    }
    await receiver.updateOne({ $push: { followers: sender._id } });
    await sender.updateOne({ $push: { followings: receiver._id } });
    return res.json(`You successfully followed ${receiver.first_name}.`);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.unFollow = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("You can't un-follow yourself!");
    }
    const receiver = await User.findById(req.params.id);
    const sender = await User.findById(req.user._id);
    if (
      !receiver.followers.includes(sender._id) &&
      !sender.followings.includes(receiver._id)
    ) {
      return res.status(400).json(`Error!`);
    }
    await receiver.updateOne({ $pull: { followers: sender._id } });
    await sender.updateOne({ $pull: { followings: receiver._id } });
    return res.json(`You successfully un-followed ${receiver.first_name}.`);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("Error while accepting the request!");
    }
    const receiver = await User.findById(req.user._id);
    const sender = await User.findById(req.params.id);
    if (
      receiver.friends.includes(sender._id) &&
      sender.friends.includes(receiver._id)
    )
      return res
        .status(400)
        .json(`${sender.first_name} is already in your friends list!`);

    await receiver.updateOne({
      $push: { followings: sender._id, friends: sender._id },
    });
    await receiver.updateOne({
      $pull: { requests: sender._id },
    });

    await sender.updateOne({
      $push: { followers: receiver._id, friends: receiver._id },
    });

    return res.json(
      `You successfully accepted ${receiver.first_name}'s request.`
    );
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.unFriend = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("Error while un-friending!");
    }
    const rejecter = await User.findById(req.user._id);
    const friend = await User.findById(req.params.id);
    if (
      !rejecter.friends.includes(friend._id) &&
      !friend.friends.includes(rejecter._id)
    )
      return res
        .status(400)
        .json(`${friend.first_name} is not in your friends list!`);

    await rejecter.updateOne({
      $pull: {
        followings: friend._id,
        followers: friend._id,
        friends: friend._id,
      },
    });

    await friend.updateOne({
      $pull: {
        followers: rejecter._id,
        followings: rejecter._id,
        friends: rejecter._id,
      },
    });

    return res.json(`You successfully un-friended ${friend.first_name}.`);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    if (req.params.id.toString() === req.user._id.toString()) {
      return res.status(400).json("Error while rejecting the request!");
    }
    const rejecter = await User.findById(req.user._id);
    const sender = await User.findById(req.params.id);

    if (!rejecter.requests.includes(sender._id))
      return res.status(400).json(`${sender.first_name} didn't request you!`);

    await rejecter.updateOne({
      $pull: {
        requests: sender._id,
        followers: sender._id,
      },
    });

    await sender.updateOne({
      $pull: {
        followings: rejecter._id,
      },
    });

    return res.json(
      `You successfully rejected ${sender.first_name}'s request.`
    );
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const users = await User.find({ $text: { $search: searchTerm } }).select(
      "username first_name last_name picture"
    );

    res.json(users);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.addToSearchHistory = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const user = await User.findById(req.user._id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        { _id: req.user._id, "search._id": check._id },
        { $set: { "search.$.createdAt": new Date() } }
      );

      res.json(user.search);
    } else {
      const search = {
        user: searchUser,
        createdAt: new Date(),
      };
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          search,
        },
      });
      res.json(user.search);
    }
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const searchHistory = await User.findById(req.user._id)
      .select("search")
      .populate("search.user", "username first_name last_name picture");
    return res.json(searchHistory.search);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.removeFromSearch = async (req, res) => {
  try {
    const { searchUser } = req.params;
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { search: { user: searchUser } },
    });
    const searchHistory = await User.findById(req.user._id)
      .select("search")
      .populate("search.user", "username first_name last_name picture");
    return res.json(searchHistory.search);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getFriendsInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("friends requests")
      .populate("friends", "first_name last_name picture username")
      .populate("requests", "first_name last_name picture username");
    const sentRequests = await User.find({
      requests: new mongoose.Types.ObjectId(req.user._id),
    }).select("first_name last_name picture username");
    res.json({
      friends: user.friends,
      requestsReceived: user.requests,
      requestsSent: sentRequests,
    });
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};
