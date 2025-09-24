const User = require("../models/UserSchema");
const Blog = require("../models/BlogSchema");

// Get all users (excluding admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("authorId", "name email");
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch blogs", error: err.message });
  }
};

// Block a user or author
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User blocked", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error blocking user", error: err.message });
  }
};

// Unblock a user or author
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User unblocked", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unblocking user", error: err.message });
  }
};

// Block a blog
exports.blockBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { articleId: req.params.articleId },
      { isBlocked: true },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog blocked", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error blocking blog", error: err.message });
  }
};

// Unblock a blog
exports.unblockBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { articleId: req.params.articleId },
      { isBlocked: false },
      { new: true }
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog unblocked", blog });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unblocking blog", error: err.message });
  }
};
