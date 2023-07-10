const Post = require("../models/Post");
const cloudinary = require("cloudinary");
const { unlink } = require("fs");
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
    console.log(imagePath, "IMAGEPATH");
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
    console.log(error, "ERrOr");
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};
