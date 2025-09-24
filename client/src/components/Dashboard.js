import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  return (
    <div className="text-primary bg-light m-5 text-center p-5 rounded">
      <h1>Welcome, {name || "User"}!</h1>
      <p className="lead">
        You're logged in as <strong>{role}</strong>. Manage your posts, view
        insights, and customize your profile.
      </p>

      <div className="dashboard-actions">
        <button className="btn btn-primary m-2">Create New Post</button>
        <button className="btn btn-info m-2">Explore</button>
        <button className="btn btn-success m-2">My Profile</button>

        {role === "admin" && (
          <button className="btn btn-danger m-2">Admin Panel</button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
