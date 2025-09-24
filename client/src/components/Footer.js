import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">BlogNest</h2>
          <p className="footer-description">
            A space to express, learn, and inspire. Join our community of
            writers today.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/register" className="footer-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="footer-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="footer-link">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-github"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BlogNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
