const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/", blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:articleId", blogController.getBlogByArticleId);
router.put("/:articleId", blogController.updateBlog);
router.delete("/:articleId", blogController.deleteBlog);

module.exports = router;
