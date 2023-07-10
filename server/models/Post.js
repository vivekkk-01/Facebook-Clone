const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "coverPicture", null],
      default: null,
    },
    text: String,
    images: [{}],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    background: String,
    comment: {
      comment: String,
      image: String,
      commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      commentedAt: {
        type: Date,
        default: new Date(),
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
