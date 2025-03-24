import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the Shop page with the search term as a query parameter
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div style={{ 
      background: "linear-gradient(to bottom, #111, #333)", 
      height: "100vh", 
      color: "white", 
      position: "relative",
      overflow: "hidden" 
    }}>
      {/* Background Image Section */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "url('/path-to-your-image.png') center/cover no-repeat",
          zIndex: -1
        }}
      />

      {/* Logo and Main Heading */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#FFD700" }}>BookNest</h1>
        <p style={{ fontSize: "18px", color: "white" }}>Search your favourite books here...</p>
      </div>

      {/* Search Bar and Buttons Section */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}>
        <TextField
          style={{
            width: "400px",
            background: "white",
            borderRadius: "5px"
          }}
          placeholder="Search Books Here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          style={{
            marginLeft: "10px",
            background: "#FFD700",
            color: "black",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleSearch} // Trigger search
        >
          🔍
        </Button>

        <Button
          style={{
            marginTop: "20px",
            background: "#FFD700",
            color: "black",
            padding: "10px 20px",
            borderRadius: "25px",
            display: "block",
            margin: "20px auto",
          }}
          component={Link}
          to="/shop" // Redirects to /shop
        >
          View Full Site
        </Button>
      </div>

      {/* Footer (Optional) */}
      <div style={{ position: "absolute", bottom: "10px", width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "gray" }}>© 2025 BookNest</p>
      </div>
    </div>
  );
}