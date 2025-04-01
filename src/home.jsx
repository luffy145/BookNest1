import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/shop?search=${encodeURIComponent(searchTerm)}');
  };

  return (
    <div className="home-container">
      {/* Background Image */}
      <div className="background-image" />

      {/* Logo and Main Heading */}
      <div className="header">
        <h1 className="logo">BookNest</h1>
        <p className="tagline">Search your favourite books here...</p>
      </div>

      {/* Search Bar and Buttons Section */}
      <div className="search-section">
        <div className="search-bar">
          <input
            className="search-input"
            placeholder="Search Books Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>

        <Link to="/shop" className="view-site-button">
          View Full Site
        </Link>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="copyright">© 2025 BookNest</p>
      </div>
    </div>
  );
}