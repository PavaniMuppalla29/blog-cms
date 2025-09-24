import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBlog.css"; // Create and style this CSS file

const EditBlog = () => {
  const { id } = useParams(); // This should match your articleId route param
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blog/${id}`);
        const blog = res.data;
        setFormData({
          title: blog.title,
          category: blog.category,
          content: blog.content,
        });
        setLoading(false);
      } catch (err) {
        setError("⚠️ Failed to load blog data.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/blog/${id}`, {
        ...formData,
        dateOfModification: new Date().toISOString(),
      });
      navigate("/author-dashboard");
    } catch (err) {
      setError("⚠️ Failed to update blog.");
    }
  };

  if (loading) return <p className="loading">⏳ Loading blog details...</p>;

  return (
    <div className="edit-blog-container">
      <h2 className="edit-heading">✏️ Edit Your Blog</h2>
      {error && <p className="error">{error}</p>}
      <form className="edit-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter blog category"
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content..."
          required
        ></textarea>

        <button className="submit-btn" type="submit">
          ✅ Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
