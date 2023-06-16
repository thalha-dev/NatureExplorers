const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
  this.title = this.title.trim();
  this.content = this.content.trim();
  next();
});

module.exports = mongoose.model("Article", articleSchema);
