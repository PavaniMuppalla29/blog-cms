const Blog = require("../models/BlogSchema");
const User = require("../models/UserSchema");

// GET all blogs by a specific author
const getBlogsByAuthor = async (req, res) => {
  const { authorId } = req.params;
  try {
    const blogs = await Blog.find({ "authorData.authorId": authorId });
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

// GET author profile by ID
const getAuthorProfile = async (req, res) => {
  const { authorId } = req.params;
  try {
    const author = await User.findOne({ _id: authorId, role: "author" }).select(
      "-password"
    );
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getBlogsByAuthor, getAuthorProfile };
