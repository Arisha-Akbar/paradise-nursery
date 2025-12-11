// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white"
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/landing-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold mb-3">🌿 Paradise Nursery</h1>
        <p className="lead mb-4 px-3" style={{ maxWidth: "600px" }}>
          Discover lush, easy-care houseplants to bring life, calm, and beauty
          to your home or office.
        </p>
        <Link
          to="/products"
          className="btn btn-success btn-lg px-5 py-3 fw-bold"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
