import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/blog");
        setBlogs(res.data);
      } catch (err) {
        setError("Failed to load blogs.");
      }
    };

    fetchBlogs();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="user-dashboard">
      <h2>👋 Welcome to User Dashboard</h2>
      <h3>📝 Explore Blogs by Authors</h3>

      {error && <p className="error">{error}</p>}
      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs available.</p>
      ) : (
        <div className="blog-list">
          {blogs.map((blog) => (
            <div
              className="blog-card w-100"
              key={blog._id}
              onClick={() => handleCardClick(blog.articleId)}
              style={{ cursor: "pointer" }}
            >
              <div className="blog-card-header">
                <p className="blog-date">
                  {new Date(blog.dateOfCreation).toLocaleDateString()}
                </p>
              </div>

              <div className="blog-card-content">
                <h4 className="blog-title">{blog.title}</h4>
                <p className="blog-content">{blog.content.slice(0, 100)}...</p>
                <p className="blog-author">
                  <strong>Author:</strong> {blog.authorData.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
