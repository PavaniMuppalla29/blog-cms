import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-text">
          BlogNest
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        {!token && (
          <>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}

        {token && (
          <>
            <li>
              {role === "user" && (
                <Link to="/user-dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              {role === "author" && (
                <Link to="/author-dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              {role === "admin" && (
                <Link to="/admin-dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout ({name})
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
