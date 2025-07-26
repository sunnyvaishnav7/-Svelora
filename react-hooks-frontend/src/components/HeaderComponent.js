import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './HeaderComponent.css'

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleRedirect = () => {
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false); // Close menu after navigation
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="nav-left">
          <nav className="main-nav">
            {/* Use Link components instead of anchor tags for internal routing */}
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/employee" className="nav-link">Employee Info</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
          </nav>
        </div>
                
        <div className="logo">
          <a href="https://javaguides.net" className="logo-link" target="_blank" rel="noopener noreferrer">
            Svelor
          </a>
        </div>
                
        <div className="nav-right">
          <div className="dropdown">
            {/* Dropdown content commented out */}
          </div>
                    
          <button className="cta-button" onClick={handleRedirect}>
           Login/register
          </button>
        </div>
                
        {/* Mobile menu button - Fixed structure */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <button className="mobile-nav-item" onClick={() => handleMobileNavClick('/')}>
              Home
            </button>
            <button className="mobile-nav-item" onClick={() => handleMobileNavClick('/employee')}>
              Employee Info
            </button>
            <button className="mobile-nav-item" onClick={() => handleMobileNavClick('/about')}>
              About Us
            </button>
            <button className="mobile-nav-item" onClick={() => handleMobileNavClick('/contact')}>
              Contact
            </button>
            <button className="mobile-nav-item" onClick={handleRedirect}>
              Login/Register
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderComponent;