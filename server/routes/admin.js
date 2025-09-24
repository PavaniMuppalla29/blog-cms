const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Users
router.get("/users", adminController.getAllUsers);
router.put("/block-user/:id", adminController.blockUser);
router.put("/unblock-user/:id", adminController.unblockUser);

// Blogs
router.get("/blogs", adminController.getAllBlogs);
router.put("/block-blog/:articleId", adminController.blockBlog);
router.put("/unblock-blog/:articleId", adminController.unblockBlog);

module.exports = router;
