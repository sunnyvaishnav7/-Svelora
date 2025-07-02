import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';
import './Contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="contact-us-container">
      <div className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Get In Touch</h1>
          <p className="hero-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p className="contact-description">
            Reach out to us through any of these channels, and we'll get back to you promptly.
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon">
                <Mail size={24} />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>www.sunnyvaishnavh77@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <Phone size={24} />
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91 8949640984</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <MapPin size={24} />
              </div>
              <div className="contact-text">
                <h3>Address</h3>
                <p>Seva Ashram, Sec.3<br />Udaipur, Rajasthna,India (312204)</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://x.com/Sunnyvaishnav77" className="social-link twitter">X</a>
              <a href="https://www.linkedin.com/in/shani-vaishnav-10a50a1bb/" className="social-link linkedin">IN</a>
              <a href="https://www.instagram.com/iamsunnyvaishnav/" className="social-link instagram">IG</a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <div className="contact-form">
            <h2>Send us a Message</h2>
            
            {submitted && (
              <div className="success-message">
                <Send size={20} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <div className="input-wrapper">
                <MessageSquare size={18} className="input-icon" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>

            <button 
              onClick={handleSubmit}
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;