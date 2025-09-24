const Blog = require("../models/BlogSchema");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const {
      authorData,
      articleId,
      title,
      category,
      content,
      dateOfCreation,
      dateOfModification,
      isArticleActive,
      comments,
    } = req.body;

    const newBlog = new Blog({
      authorData,
      articleId,
      title,
      category,
      content,
      dateOfCreation,
      dateOfModification,
      isArticleActive,
      comments: comments || [],
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating blog", error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blogs", error: err.message });
  }
};

// Get blog by articleId
exports.getBlogByArticleId = async (req, res) => {
  try {
    const blog = await Blog.findOne({ articleId: req.params.articleId });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { articleId: req.params.articleId },
      req.body,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: err.message });
  }
};

// Delete a blog by articleId
exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({
      articleId: req.params.articleId,
    });
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: err.message });
  }
};
