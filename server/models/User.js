const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    picture: {
      type: String,
      trim: true,
      default:
        "https://th.bing.com/th/id/R.578e62715eaa62d3979fc72d09ff2807?rik=zwnZbhfC%2f%2bEdFw&riu=http%3a%2f%2fwww.baytekent.com%2fwp-content%2fuploads%2f2016%2f12%2ffacebook-default-no-profile-pic1.jpg&ehk=MKVbuUiOWCQ4f7d%2fTknilYnrg4IyIHs54kQO1mxHX2E%3d&risl=&pid=ImgRaw&r=0",
    },
    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required."],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpire: Date,
    birth_year: {
      type: Number,
      trim: true,
      required: [true, "Birth Year is required."],
    },
    birth_month: {
      type: Number,
      trim: true,
      required: [true, "Birth Month is required."],
    },
    birth_day: {
      type: Number,
      trim: true,
      required: [true, "Birth Day is required."],
    },
    friends: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
        trim: true,
      },
      otherName: {
        type: String,
        trim: true,
      },
      job: {
        type: String,
        trim: true,
      },
      workplace: {
        type: String,
        trim: true,
      },
      currentCity: {
        type: String,
        trim: true,
      },
      homeTown: {
        type: String,
        trim: true,
      },
      highSchool: {
        type: String,
        trim: true,
      },
      college: {
        type: String,
        trim: true,
      },
      relationship: {
        type: String,
        enum: ["Single", "Divorced", "Married", "In a relationship"],
      },
      Instagram: {
        type: String,
        trim: true,
      },
      savedPosts: [
        {
          post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
          },
          savedAt: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
