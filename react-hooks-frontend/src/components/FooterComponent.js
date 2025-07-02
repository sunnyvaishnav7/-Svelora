import React from 'react'
import './FooterComponent.css'

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Svelor
</h3>
              <p>Employee Management System</p>
            </div>
            <p className="footer-description">
              Streamline your workforce management with our comprehensive employee management solution. 
              Built for modern businesses.
            </p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/shani-vaishnav-10a50a1bb/" className="social-link" aria-label="Linkedin">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.026-3.036-1.852-3.036-1.853 0-2.136 1.445-2.136 2.939v5.666h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.602 0 4.268 2.369 4.268 5.455v6.288zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.07s.925-2.07 2.069-2.07 2.07.926 2.07 2.07c0 1.144-.926 2.07-2.07 2.07zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.555C0 23.228.792 24 1.771 24h20.451C23.2 24 24 23.228 24 22.278V1.723C24 .771 23.2 0 22.225 0z"/>
                </svg>
              </a>
              <a href="https://x.com/Sunnyvaishnav77" className="social-link" aria-label="X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/iamsunnyvaishnav/" className="social-link" aria-label="insta">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 011.675 1.09 4.92 4.92 0 011.09 1.675c.163.457.347 1.256.403 2.427.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 01-1.09 1.675 4.92 4.92 0 01-1.675 1.09c-.457.163-1.256.347-2.427.403-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 01-1.675-1.09 4.92 4.92 0 01-1.09-1.675c-.163-.457-.347-1.256-.403-2.427-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.92 4.92 0 011.09-1.675A4.92 4.92 0 014.723 2.64c.457-.163 1.256-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.771.13 4.665.332 3.763.722a7.074 7.074 0 00-2.57 1.662A7.074 7.074 0 00.722 4.955c-.39.902-.592 2.008-.65 3.289C.014 8.525 0 8.934 0 12c0 3.066.014 3.475.072 4.755.058 1.281.26 2.387.65 3.289a7.074 7.074 0 001.662 2.57 7.074 7.074 0 002.57 1.662c.902.39 2.008.592 3.289.65 1.281.058 1.69.072 4.755.072s3.475-.014 4.755-.072c1.281-.058 2.387-.26 3.289-.65a7.074 7.074 0 002.57-1.662 7.074 7.074 0 001.662-2.57c.39-.902.592-2.008.65-3.289.058-1.281.072-1.69.072-4.755s-.014-3.475-.072-4.755c-.058-1.281-.26-2.387-.65-3.289a7.074 7.074 0 00-1.662-2.57A7.074 7.074 0 0020.237.722c-.902-.39-2.008-.592-3.289-.65C15.475.014 15.066 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/employee-info">Employee Info</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="/services/employee-management">Employee Management</a></li>
              <li><a href="/services/payroll">Payroll Management</a></li>
              <li><a href="/services/hr-analytics">HR Analytics</a></li>
              <li><a href="/services/performance">Performance Tracking</a></li>
              <li><a href="/services/reporting">Reporting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Seva Ashram, Sec.3, Udaipur, Rajasthna,India (312204) </span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+91 8949640984</span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>www.sunnyvaishnavh77@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Sunny Vaishnav. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent