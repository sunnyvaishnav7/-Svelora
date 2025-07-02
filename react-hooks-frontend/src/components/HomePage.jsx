import React, { useState, useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState({
    satisfaction: 94,
    productivity: 87,
    activeUsers: 1247,
    efficiency: 92
  });

  const redirectToYouTube = () => {
    // Replace this URL with your desired YouTube video
    const youtubeURL = "https://youtu.be/EHSAC7UjciA?si=K3pAFmd7Y8g-HbtQ";
    window.open(youtubeURL, '_blank');
  };

  const redirectToFreeTrial = () => {

    const freeTrialURL = "/freetrial";
    window.open(freeTrialURL,'_blank');
  }

  const redirectToPayment = () => {
    const paymentURL = "/payment";
    window.open(paymentURL, '_blank');
  }

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate real-time metric updates
    const interval = setInterval(() => {
      setCurrentMetrics(prev => ({
        satisfaction: Math.max(85, Math.min(98, prev.satisfaction + (Math.random() - 0.5) * 2)),
        productivity: Math.max(80, Math.min(95, prev.productivity + (Math.random() - 0.5) * 1.5)),
        activeUsers: Math.max(1200, Math.min(1300, prev.activeUsers + Math.floor((Math.random() - 0.5) * 20))),
        efficiency: Math.max(88, Math.min(96, prev.efficiency + (Math.random() - 0.5) * 1.8))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const employees = [
    { name: 'Raj Thakkar', role: 'Team Lead', avatar: 'RT' },
    { name: 'Deep Chovatiya', role: 'Developer', avatar: 'DC' },
    { name: 'Vadik Patel', role: 'Designer', avatar: 'VP' },
    { name: 'Akash Tomer', role: 'HR Manager', avatar: 'AT' },
    { name: 'Bhargav Kotadiya', role: 'Analyst', avatar: 'BK' },
    { name: 'Pratik Sharma', role: 'Manager', avatar: 'PS' }
  ];

  return (
    <div className="homepage">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="cloud-shape cloud-1"></div>
        <div className="cloud-shape cloud-2"></div>
        <div className="cloud-shape cloud-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
              Manage Your <span className="gradient-text">Dream Team</span> with AI-Powered Intelligence
            </h1>
            <p className={`hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
              Experience the future of workforce management with real-time analytics, 
              predictive insights, and seamless automation that transforms how you lead.
            </p>
            <div className={`hero-buttons ${isVisible ? 'animate-in' : ''}`}>
              <button className="cta-primary" onClick={redirectToFreeTrial}>
                Start Free Trial
              </button>
              <button className="cta-secondary" onClick={redirectToYouTube}>
                <span>Watch Demo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Dashboard Card */}
          <div className={`dashboard-card ${isVisible ? 'animate-in' : ''}`}>
            <div className="dashboard-header">
              <h3 className="dashboard-title">Live Dashboard</h3>
              <div className="live-indicator">
                <div className="live-dot"></div>
                <span>Live</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-value">{Math.round(currentMetrics.satisfaction)}%</div>
                <div className="metric-label">Employee Satisfaction</div>
                <div className="metric-progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${currentMetrics.satisfaction}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{Math.round(currentMetrics.productivity)}%</div>
                <div className="metric-label">Team Productivity</div>
                <div className="metric-progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${currentMetrics.productivity}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{Math.round(currentMetrics.activeUsers)}</div>
                <div className="metric-label">Active Users</div>
                <div className="metric-progress">
                  <div className="progress-bar" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-value">{Math.round(currentMetrics.efficiency)}%</div>
                <div className="metric-label">System Efficiency</div>
                <div className="metric-progress">
                  <div 
                    className="progress-bar" 
                    style={{width: `${currentMetrics.efficiency}%`}}
                  ></div>
                </div>
              </div>
            </div>

            {/* Employee Grid */}
            <div className="employee-grid">
              {employees.map((employee, index) => (
                <div key={index} className="employee-card-mini">
                  <div className="employee-avatar-mini">{employee.avatar}</div>
                  <div className="employee-name-mini">{employee.name}</div>
                  <div className="employee-role-mini">{employee.role}</div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="floating-elements">
              <div className="floating-widget widget-1">
                <div className="widget-content">
                  <div className="widget-value">+12%</div>
                  <div className="widget-label">This Week</div>
                </div>
              </div>
              
              <div className="floating-widget widget-2">
                <div className="widget-content">
                  <div className="widget-value">24/7</div>
                  <div className="widget-label">Support</div>
                </div>
              </div>
              
              <div className="floating-widget widget-3">
                <div className="widget-content">
                  <div className="widget-value">99.9%</div>
                  <div className="widget-label">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Modern Teams</h2>
            <p className="section-subtitle">
              Advanced AI-driven tools that revolutionize how you manage, analyze, and optimize your workforce
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-Powered Analytics</h3>
              <p className="feature-description">
                Leverage machine learning to predict trends, identify bottlenecks, and optimize team performance with unprecedented accuracy.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5v15C3 19.33 3.67 20 4.5 20h15c.83 0 1.5-.67 1.5-1.5v-15C21 2.67 20.33 2 19.5 2zm0 16h-15v-2h15v2zm0-5h-15V6h15v7z"/>
                </svg>
              </div>
              <h3 className="feature-title">Real-Time Monitoring</h3>
              <p className="feature-description">
                Monitor team activity, project progress, and system health in real-time with customizable dashboards and instant alerts.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2V9.5C14 8.12 12.88 7 11.5 7S9 8.12 9 9.5V11H7v7h2v-4h2v4h2v-4h1l5.24-7.65-1.48-1.02L15.28 9.5c-.22-.49-.71-.85-1.28-.85-.83 0-1.5.67-1.5 1.5V18H4z"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Automation</h3>
              <p className="feature-description">
                Automate routine tasks, streamline workflows, and reduce manual overhead with intelligent process automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Employees</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Companies Trust Us</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime Guarantee</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
<section className="pricing-section">
  <div className="pricing-container">
    <div className="section-header">
      <h2 className="section-title">Choose Your Perfect Plan</h2>
      <p className="section-subtitle">
        Flexible pricing options designed to scale with your business needs
      </p>
    </div>
    
    <div className="pricing-grid">
      {/* Starter Plan */}
      <div className="pricing-card">
        <div className="pricing-header">
          <div className="plan-badge">Most Popular</div> <br />
          <h3 className="plan-name">Starter</h3>
          <div className="plan-price">
            <span className="price">$29</span>
            <span className="period">/month</span>
          </div>
          <p className="plan-description">Perfect for small teams getting started</p>
        </div>
        
        <div className="pricing-features">
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              
            </svg>
            <span>Up to 25 employees</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Basic analytics</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Email support</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Mobile app access</span>
          </div>
        </div>
        
        <button className="pricing-cta" onClick={redirectToPayment}>Start Free Trial</button>
      </div>

      {/* Professional Plan */}
      <div className="pricing-card featured">
        <div className="pricing-header">
          <div className="plan-badge featured-badge">Best Value</div> <br />
          <h3 className="plan-name">Professional</h3>
          <div className="plan-price">
            <span className="price">$79</span>
            <span className="period">/month</span>
          </div>
          <p className="plan-description">Advanced features for growing businesses</p>
        </div>
        
        <div className="pricing-features">
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Up to 100 employees</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Advanced AI analytics</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Priority support</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Custom integrations</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>API access</span>
          </div>
        </div>
        
        <button className="pricing-cta featured-cta" onClick={redirectToPayment}>Get Started</button>
      </div>

      {/* Enterprise Plan */}
      <div className="pricing-card">
        <div className="pricing-header">
          <h3 className="plan-name">Enterprise</h3>
          <div className="plan-price">
            <span className="price">Custom</span>
            <span className="period">pricing</span>
          </div>
          <p className="plan-description">Tailored solutions for large organizations</p>
        </div>
        
        <div className="pricing-features">
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Unlimited employees</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Full AI suite</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>24/7 dedicated support</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Custom development</span>
          </div>
          <div className="feature-item">
            <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>On-premise deployment</span>
          </div>
        </div>
        
        <button className="pricing-cta" onClick={redirectToPayment}>Contact Sales</button>
      </div>
    </div>
  </div>
</section>


{/* Global Reach Section */}
<section className="global-reach-section">
  <div className="global-reach-container">
    <div className="section-header">
      <h2 className="section-title">Global Impact & Reach</h2>
      <p className="section-subtitle">
        Trusted by companies worldwide, transforming workforces across continents
      </p>
    </div>
    
    <div className="global-content">
      {/* World Map Visual */}
      <div className="world-map-container">
        <div className="world-map">
          <svg viewBox="0 0 1000 500" className="map-svg">
            {/* Simplified World Map SVG */}
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0.3}} />
              </linearGradient>
            </defs>
            
            {/* Continents (simplified shapes) */}
            <path d="M150 150 L300 140 L320 180 L280 220 L180 210 Z" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M320 120 L480 110 L520 140 L500 180 L460 200 L380 190 L340 160 Z" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M520 160 L650 150 L680 180 L660 220 L580 210 Z" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M200 280 L350 270 L380 310 L340 350 L240 340 Z" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            <path d="M750 200 L850 190 L880 230 L860 270 L780 260 Z" fill="url(#mapGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
            
            {/* Location Markers */}
            <circle cx="250" cy="180" r="8" fill="#10b981" className="location-marker">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="420" cy="160" r="8" fill="#3b82f6" className="location-marker">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="580" cy="180" r="8" fill="#8b5cf6" className="location-marker">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
            <circle cx="800" cy="220" r="8" fill="#f59e0b" className="location-marker">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="1.5s"/>
            </circle>
            <circle cx="280" cy="320" r="8" fill="#ef4444" className="location-marker">
              <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin="0.8s"/>
            </circle>
          </svg>
          
          {/* Floating Stats */}
          <div className="map-stat stat-1">
            <div className="stat-value">25K+</div>
            <div className="stat-label">North America</div>
          </div>
          
          <div className="map-stat stat-2">
            <div className="stat-value">18K+</div>
            <div className="stat-label">Europe</div>
          </div>
          
          <div className="map-stat stat-3">
            <div className="stat-value">12K+</div>
            <div className="stat-label">Asia Pacific</div>
          </div>
          
          <div className="map-stat stat-4">
            <div className="stat-value">8K+</div>
            <div className="stat-label">Latin America</div>
          </div>
          
          <div className="map-stat stat-5">
            <div className="stat-value">5K+</div>
            <div className="stat-label">Middle East & Africa</div>
          </div>
        </div>
      </div>
      
      {/* Impact Stats Grid */}
      <div className="impact-stats-grid">
        <div className="impact-stat">
          <div className="impact-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="impact-number">68+</div>
          <div className="impact-label">Countries Served</div>
        </div>
        
        <div className="impact-stat">
          <div className="impact-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
            </svg>
          </div>
          <div className="impact-number">500M+</div>
          <div className="impact-label">Hours Optimized</div>
        </div>
        
        <div className="impact-stat">
          <div className="impact-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="impact-number">98%</div>
          <div className="impact-label">Customer Satisfaction</div>
        </div>
        
        <div className="impact-stat">
          <div className="impact-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V1h-2v1H8V1H6v1H4.5C3.67 2 3 2.67 3 3.5v15C3 19.33 3.67 20 4.5 20h15c.83 0 1.5-.67 1.5-1.5v-15C21 2.67 20.33 2 19.5 2z"/>
            </svg>
          </div>
          <div className="impact-number">$2.5B+</div>
          <div className="impact-label">Cost Savings Generated</div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Transform Your Workforce Management?</h2>
            <p>Join thousands of companies already using our platform to boost productivity and employee satisfaction.</p>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={redirectToFreeTrial}>Start Free Trial</button>
              <button className="cta-outline" >Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;