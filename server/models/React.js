const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reactSchema = new Schema(
  {
    react: {
      type: String,
      enum: ["like", "wow", "haha", "sad", "angry", "love", ""],
      default: "",
      required: true,
    },
    reactBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postRef: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("React", reactSchema);
