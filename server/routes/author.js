const express = require("express");
const router = express.Router();
const {
  getBlogsByAuthor,
  getAuthorProfile,
} = require("../controllers/authorController");

// GET blogs by authorId
router.get("/blogs/:authorId", getBlogsByAuthor);

// GET author profile
router.get("/profile/:authorId", getAuthorProfile);

module.exports = router;
