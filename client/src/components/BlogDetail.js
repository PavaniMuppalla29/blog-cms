import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/blog/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => setError("Error fetching blog"));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading blog...</p>;

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>
        <strong>Category:</strong> {blog.category}
      </p>
      <p>
        <strong>Author:</strong> {blog.authorData.name}
      </p>
      <p>
        <strong>Published on:</strong> {blog.dateOfCreation}
      </p>
      <div className="blog-full-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetail;
