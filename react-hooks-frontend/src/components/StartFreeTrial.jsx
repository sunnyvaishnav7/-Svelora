import React, { useState } from 'react';
import './StartFreeTrial.css';

const StartFreeTrial = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Password strength check
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const validateForm = () => {
    const { fullName, email, mobile, password } = formData;
    
    if (!fullName.trim()) {
      setMessage('Please enter your full name');
      setMessageType('error');
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return false;
    }
    
    if (!mobile.trim() || !/^\d{10,}$/.test(mobile.replace(/\D/g, ''))) {
      setMessage('Please enter a valid mobile number');
      setMessageType('error');
      return false;
    }
    
    if (!password.trim() || password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage('🎉 Your free trial has been activated! Check your email for login details.');
      setMessageType('success');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        password: ''
      });
      setPasswordStrength('');
      
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trial-container-1">
      <div className="trial-form">
        <h2>Start Your Free Trial</h2>
        <p className="trial-subtitle">
          Get full access to all premium features for 14 days
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              required
            />
            {formData.password && (
              <div className="password-strength">
                <div className={`password-strength-bar ${passwordStrength}`}></div>
              </div>
            )}
          </div>

          <button 
            type="submit"
            className={`trial-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Activating Trial...' : 'Start Free Trial'}
          </button>
        </form>

        {message && (
          <div className={`form-message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="trial-features">
          <h4>What's included in your free trial:</h4>
          <ul>
            <li>✨ Full access to all premium features</li>
            <li>📊 Advanced analytics dashboard</li>
            <li>🔒 Enterprise-grade security</li>
            <li>💬 24/7 priority support</li>
            <li>🚀 Unlimited team members</li>
          </ul>
        </div>

        <div className="trial-footer">
          <p>
            Already have an account? <a href="/login">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartFreeTrial;