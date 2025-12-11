// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white position-relative"
      style={{
        background: `
          linear-gradient(rgba(41, 40, 40, 0.5), rgba(67, 66, 66, 0.5)),
          url(/images/bg.jpg)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Subtle animated overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>

      <div className="container z-1 text-center d-flex flex-column align-items-center">
        <h1
          className="display-3 fw-bold mb-3 d-flex align-items-center justify-content-center"
          style={{ letterSpacing: "1px" }}
        >
          <img
            src="/images/logo.png"
            alt="Logo"
            width="60"
            height="60"
            className="me-2"
          />
          Paradise Nursery
        </h1>
        <p
          className="lead mb-4 px-3"
          style={{ maxWidth: "600px", lineHeight: "1.6" }}
        >
          Discover lush, easy-care houseplants to bring life, calm, and beauty
          to your home or office.
        </p>
        <Link
          to="/products"
          className="btn btn-success btn-lg px-5 py-3 fw-bold rounded-pill shadow-sm"
          style={{
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}

export default Home;
