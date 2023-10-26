const Post = require("../models/Post");
const React = require("../models/React");
const cloudinary = require("cloudinary");
const { unlink } = require("fs");
const mongoose = require("mongoose");
const path = require("path");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    const { path: imagePath } = req.body;
    if (req.files) {
      await Promise.all(
        req.files?.map(async (file) => {
          const filePath = path.join(`public/uploads/images/${file.filename}`);
          const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
            filePath,
            { folder: imagePath ? imagePath : null }
          );
          post.images.push({ secure_url, public_id });
          unlink(filePath, (err) => {
            if (err) {
              throw err;
            }
          });
        })
      );
    }
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const postsArr = await Post.find();
    const posts =
      postsArr.comments?.length > 0
        ? postsArr
            .populate("user", "first_name last_name picture gender username")
            .populate(
              "comments.commentBy",
              "first_name last_name picture username"
            )
            .sort({ createdAt: -1 })
        : postsArr
            .populate("user", "first_name last_name picture gender username")
            .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: req.user._id,
    });
    if (check == null) {
      const newReact = new React({
        postRef: postId,
        reactBy: req.user._id,
        react,
      });
      await newReact.save();
      return res.json("React created successfully!");
    } else {
      if (check.react === react) {
        await React.findByIdAndRemove(check._id);
        return res.json("React deleted successfully!");
      } else {
        await React.findByIdAndUpdate(check._id, { react });
        return res.json("React updated successfully!");
      }
    }
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.getReacts = async (req, res) => {
  try {
    const { postId } = req.params;
    const reactsArray = await React.find({ postRef: postId });
    const reacted = await React.findOne({
      postRef: postId,
      reactBy: req.user._id,
    });

    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});
    const reacts = [
      {
        react: "like",
        count: newReacts.like?.length ? newReacts.like?.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha?.length ? newReacts.haha?.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad?.length ? newReacts.sad?.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow?.length ? newReacts.wow?.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry?.length ? newReacts.angry?.length : 0,
      },
      {
        react: "love",
        count: newReacts.love?.length ? newReacts.love?.length : 0,
      },
    ];
    reacts.sort((a, b) => {
      return b.count - a.count;
    });

    if (reacted == null) {
      return res.json({ reacts, total: reactsArray.length });
    } else {
      return res.json({
        reacts,
        reacted: reacted.react,
        total: reactsArray.length,
      });
    }
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (req.file) {
      const filePath = path.join(
        `public/uploads/commentImage/${req.file.filename}`
      );
      const { secure_url } = await cloudinary.v2.uploader.upload(filePath);
      unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment,
              image: secure_url,
              commentBy: req.user._id,
              commentedAt: new Date(),
            },
          },
        },
        { new: true }
      ).populate("comments.commentBy", "first_name last_name picture username");
      return res.json({ postId, comments: newPost.comments });
    } else {
      const newPost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment,
              image: "",
              commentBy: req.user._id,
              commentedAt: new Date(),
            },
          },
        },
        { new: true }
      ).populate("comments.commentBy", "first_name last_name picture username");
      return res.json({ postId, comments: newPost.comments });
    }
  } catch (error) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};
