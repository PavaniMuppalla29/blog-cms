import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AuthorDashboard.css";

const AuthorDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const authorId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleView = (articleId) => {
    navigate(`/blog/${articleId}`);
  };

  const handleEdit = (articleId) => {
    navigate(`/edit-blog/${articleId}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!authorId) {
        setError("Author ID not found. Please login again.");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4000/api/author/blogs/${authorId}`
        );
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Something went wrong while fetching blogs.");
      }
    };

    fetchBlogs();
  }, [authorId]);

  return (
    <div className="author-dashboard">
      <div className="header">
        <h2>📝 My Blogs</h2>
        <a className="write-btn" href="/write-blog">
          ✍️ Write New Blog
        </a>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="blog-list">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <h3>{blog.title}</h3>
            <p>👁️ Views: {blog.views}</p>
            <p>
              📅{" "}
              {blog.dateOfCreation && !isNaN(new Date(blog.dateOfCreation))
                ? new Date(blog.dateOfCreation).toLocaleString()
                : "Date not available"}
            </p>
            <div className="blog-actions">
              <button onClick={() => handleView(blog.articleId)}>
                👁️ View
              </button>
              <button onClick={() => handleEdit(blog.articleId)}>
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorDashboard;
