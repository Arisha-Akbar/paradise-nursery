// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Add these imports
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;