import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-hero">
      <div className="home-overlay"></div>

      <div className="container home-content">
        <h1 className="home-title">
          <img
            src="/images/logo.png"
            alt="Paradise Nursery Logo"
            className="home-logo"
          />
          Paradise Nursery
        </h1>
        <p className="home-description">
          Discover lush, easy-care houseplants to bring life, calm, and beauty
          to your home or office.
        </p>
        <Link
          to="/products"
          className="btn btn-success btn-lg px-5 py-3 fw-bold rounded-pill shadow-sm home-cta"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
