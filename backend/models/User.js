const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },

    password: {
      type: String,
      required: true,
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
