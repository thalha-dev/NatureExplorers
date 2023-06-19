const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      select: false,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },

    roles: {
      User: {
        type: Number,
      },
      Writer: {
        type: Number,
      },
      Admin: {
        type: Number,
      },
    },

    refreshToken: {
      type: String,
      // trim: true,
    },

    favouriteArticles: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
