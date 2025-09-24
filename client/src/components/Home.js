import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="blog-home-wrapper">
      <div className="blog-hero">
        <h1 className="blog-title">Welcome to BlogNest</h1>
        <p className="blog-subtitle">
          Discover stories, share your thoughts, and explore ideas from creators
          around the world.
        </p>
        <div className="blog-buttons">
          <button className="btn primary">Read Blogs</button>
          <button className="btn secondary">Write a Blog</button>
        </div>
      </div>

      <div className="featured-section">
        <h2 className="section-title">Featured Posts</h2>
        <div className="blog-cards">
          <div className="blog-card">
            <h3>How I Built My First MERN App</h3>
            <p>
              A quick walkthrough of challenges and learnings while building a
              full-stack app.
            </p>
            <button className="read-more">Read More</button>
          </div>
          <div className="blog-card">
            <h3>10 Tips to Write Clean Code</h3>
            <p>
              Simple habits that can make your code readable, maintainable, and
              professional.
            </p>
            <button className="read-more">Read More</button>
          </div>
          <div className="blog-card">
            <h3>Mastering React Router 6</h3>
            <p>
              Learn how to navigate your React apps like a pro using the latest
              Router.
            </p>
            <button className="read-more">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
