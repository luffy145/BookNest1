import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MainHeading() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="navigation-container">
      <header>
        <div className="brand-container">
          <h1 id="booknest">BookNest</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">
                <span className="icon">🏠</span>
                <span className="menu-text">Home</span>
              </Link>
            </li>
            <li className={isActive('/about') ? 'active' : ''}>
              <Link to="/about">
                <span className="icon">ℹ️</span>
                <span className="menu-text">About Us</span>
              </Link>
            </li>
            <li className={isActive('/contact') ? 'active' : ''}>
              <Link to="/contact">
                <span className="icon">📞</span>
                <span className="menu-text">Contact</span>
              </Link>
            </li>
            <li className={isActive('/shop') ? 'active' : ''}>
              <Link to="/shop">
                <span className="icon">🛒</span>
                <span className="menu-text">Shop</span>
              </Link>
            </li>
            {/* <li className={isActive('/wishlist') ? 'active' : ''}>
              <Link to="/wishlist">
                <span className="icon">❤️</span>
                <span className="menu-text">Wishlist</span>
              </Link>
            </li>
            <li className={isActive('/orders') ? 'active' : ''}>
              <Link to="/orders">
                <span className="icon">📦</span>
                <span className="menu-text">Orders</span>
              </Link> */}
            {/* </li>
            <li className={isActive('/coupons') ? 'active' : ''}>
              <Link to="/coupons">
                <span className="icon">🏷️</span>
                <span className="menu-text">Coupons</span>
              </Link>
            </li>
            <li className={isActive('/notifications') ? 'active' : ''}>
              <Link to="/notifications">
                <span className="icon">🔔</span>
                <span className="menu-text">Notifications</span>
              </Link>
            </li>
            <li className={isActive('/logout') ? 'active' : ''}>
              <Link to="/logout">
                <span className="icon">↪️</span>
                <span className="menu-text">Logout</span>
              </Link> */}
              {/* x */}
            {/* </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
}