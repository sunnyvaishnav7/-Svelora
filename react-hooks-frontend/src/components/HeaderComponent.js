import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderComponent.css'

const HeaderComponent = () => {
   const navigate = useNavigate();
const handleRedirect = () => {
    navigate('/login'); // If it's within your app
    // OR for external URL:
    // window.location.href = 'http://localhost:8080/login';
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="nav-left">
          <nav className="main-nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/employee" className="nav-link">Employee Info</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact Us</a>
          </nav>
        </div>
        
        <div className="logo">
          <a href="https://javaguides.net" className="logo-link">
            Svelor
          </a>
        </div>
        
        <div className="nav-right">
          <div className="dropdown">
            {/* <button className="dropdown-btn">
              Advertising
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="dropdown-content">
              <a href="/advertising/services">Services</a>
              <a href="/advertising/pricing">Pricing</a>
              <a href="/advertising/contact">Contact</a>
            </div> */}
          </div>
          
          <button className="cta-button" onClick={handleRedirect}>
           Login/register
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default HeaderComponent