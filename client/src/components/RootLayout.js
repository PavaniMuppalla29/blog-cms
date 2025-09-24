import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust path if needed
import Footer from "./Footer"; // Adjust path if needed
import "./RootLayout.css";

const RootLayout = () => {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
