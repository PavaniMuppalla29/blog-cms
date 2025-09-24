const mongoose = require("mongoose");

// Author data schema
const authorDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImageUrl: { type: String },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { strict: "throw" }
);

// User comment schema
const userCommentSchema = new mongoose.Schema(
  {
    nameOfUser: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { strict: "throw" }
);

// Article schema
const blogSchema = new mongoose.Schema(
  {
    authorData: { type: authorDataSchema, required: true },
    articleId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    dateOfCreation: { type: String, required: true },
    dateOfModification: { type: String, required: true },
    comments: [userCommentSchema],
    isArticleActive: { type: Boolean, required: true },
    isBlocked: { type: Boolean, default: false }, // NEW: block status for article
  },
  { strict: "throw", timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
