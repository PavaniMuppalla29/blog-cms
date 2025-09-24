import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WriteBlog.css";

const WriteBlog = () => {
  const [blog, setBlog] = useState({ title: "", content: "", category: "" });
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authorId = localStorage.getItem("userId");

  useEffect(() => {
    if (!authorId) {
      window.location.href = "/login";
    } else {
      // Fetch author details from backend
      axios
        .get(`http://localhost:4000/api/users/${authorId}`)

        .then((res) => {
          console.log("Fetched authorData:", res.data);
          setAuthorData(res.data);
        })
        .catch((err) => {
          console.error(err);
          setMessage("❌ Failed to load author details.");
        });
    }
  }, [authorId]);

  const handleChange = (e) =>
    setBlog({ ...blog, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authorData) {
      setMessage("Author data not loaded. Please try again.");
      return;
    }

    const newBlog = {
      ...blog,
      authorData: {
        name: authorData.name,
        email: authorData.email,
        profileImageUrl: authorData.profileImageUrl || "",
        authorId: authorData._id,
      },

      articleId: Math.floor(Math.random() * 1000000),
      dateOfCreation: new Date().toISOString(),
      dateOfModification: new Date().toISOString(),
      comments: [],
      isArticleActive: true,
    };

    setLoading(true);
    setMessage("");

    try {
      await axios.post(`http://localhost:4000/api/blog`, newBlog);
      setMessage("✅ Blog published successfully!");
      setBlog({ title: "", content: "", category: "" });
      setTimeout(() => {
        window.location.href = "/author-dashboard";
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to publish blog.");
    }

    setLoading(false);
  };

  return (
    <div className="write-blog-container">
      <form className="write-blog-form" onSubmit={handleSubmit}>
        <h2>✍️ Write a Blog</h2>

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={blog.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Blog Category"
          value={blog.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Write your content here..."
          rows="8"
          value={blog.content}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Blog"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default WriteBlog;
