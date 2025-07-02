import React, { useState, useEffect } from 'react';
import './About.css';
import sunnylala from '../assets/sunnylala.jpg';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [counters, setCounters] = useState({
    employees: 0,
    companies: 0,
    countries: 0,
    satisfaction: 0
  });

  const redirectToFreeTrial = () => {
    const freeTrialURL = "/freetrial";
    window.open(freeTrialURL,'_blank');
  }

  // Animate counters on component mount
  useEffect(() => {
    const animateCounters = () => {
      const targets = {
        employees: 50000,
        companies: 1200,
        countries: 45,
        satisfaction: 98
      };

      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      Object.keys(targets).forEach(key => {
        let current = 0;
        const target = targets[key];
        const step = target / steps;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, increment);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  const tabContent = {
    mission: {
      title: "Our Mission",
      content: "To revolutionize workforce management by providing innovative, user-friendly solutions that empower businesses to build stronger, more efficient teams. We believe that great employee management leads to great business success."
    },
    vision: {
      title: "Our Vision",
      content: "To become the global leader in employee management systems, creating a world where every workplace is optimized for both productivity and employee satisfaction. We envision a future where managing teams is effortless and rewarding."
    },
    values: {
      title: "Our Values",
      content: "Innovation drives us forward, integrity guides our decisions, and customer success defines our purpose. We are committed to transparency, continuous improvement, and building lasting relationships with our clients worldwide."
    }
  };

  const teamMembers = [
    {
      name: "Sunny Vaishnav",
      role: "CEO & Founder",
      image: sunnylala,
      bio: "10+ years in HR technology, passionate about transforming workplace dynamics."
    },
    {
      name: "Deep Chovatiya",
      role: "CTO",
      image: "https://media.licdn.com/dms/image/v2/D5635AQEGS1bu5zeKQQ/profile-framedphoto-shrink_400_400/B56ZUY7LjBHQAc-/0/1739879922235?e=1751972400&v=beta&t=W5Rk0EPAQHo-Z2GYsRuXYWWI9jP34uJV8J9uPzg7wgg",
      bio: "Tech innovator with expertise in scalable systems and AI-driven solutions."
    },
    {
      name: "Akash Tomer",
      role: "Head of Design",
      image: "https://media.licdn.com/dms/image/v2/D5603AQGuhN924VEAMw/profile-displayphoto-shrink_400_400/B56ZWjupnWHsAg-/0/1742208671804?e=1756944000&v=beta&t=N8jyCk5woZmYzoeHd3Qwnb0lRPMJbkqBJ3kJVtWdUZM",
      bio: "UX specialist focused on creating intuitive and beautiful user experiences."
    },
    {
      name: "Raj Thakkar",
      role: "VP of Sales",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGCFcfoNfbjRA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731568201286?e=1756944000&v=beta&t=mg2CfARf_9Yx-1OKNpV9692GqfDF1HHbNiUmEbCOFf4",
      bio: "Business growth expert helping companies maximize their team potential."
    },
    {
      name: "Vaidik Patel",
      role: "Python Developer",
      image: "https://media.licdn.com/dms/image/v2/D5635AQFVmrWA8t-ALg/profile-framedphoto-shrink_400_400/B56ZfBtpy6GoAg-/0/1751301660214?e=1751972400&v=beta&t=7qqPSRVKwvbKqVMLpfNKovjhouNm67sYu4EnwTDjWpY",
      bio: "Business growth expert helping companies maximize their team potential."
    },
    {
      name: "Bhargav Kotadiya",
      role: "Frontend Developer",
      image: "https://media.licdn.com/dms/image/v2/D4D35AQGgbxnlEAZQyQ/profile-framedphoto-shrink_400_400/B4DZeNHqxQGkAg-/0/1750419287407?e=1751972400&v=beta&t=lMalX0WF8eayPdWBQKvOo3lKojMkN4HNKYUJBWJWiw8",
      bio: "Business growth expert helping companies maximize their team potential."
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to simplify employee management"
    },
    {
      year: "2019",
      title: "First 100 Clients",
      description: "Reached our first major milestone with satisfied customers"
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded operations to serve clients across 45 countries"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Launched AI-powered features for smarter workforce insights"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as the top employee management platform"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">About Employee Manager</h1>
            <p className="hero-subtitle">
              Empowering businesses worldwide with innovative workforce management solutions
              that drive success and foster exceptional workplace cultures.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Our Story</button>
              <button className="btn-secondary">Meet the Team</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Team collaboration" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{counters.employees.toLocaleString()}+</div>
              <div className="stat-label">Employees Managed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.companies.toLocaleString()}+</div>
              <div className="stat-label">Companies Trust Us</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.countries}+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{counters.satisfaction}%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="mvv-section">
        <div className="mvv-container">
          <div className="mvv-tabs">
            {Object.keys(tabContent).map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabContent[tab].title}
              </button>
            ))}
          </div>
          <div className="mvv-content">
            <div className="mvv-card">
              <h2 className="mvv-title">{tabContent[activeTab].title}</h2>
              <p className="mvv-text">{tabContent[activeTab].content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <h2 className="section-title">Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              The passionate individuals driving innovation in workforce management
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-role">{member.role}</div>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-social">
                    <a href="#" className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Workforce Management?</h2>
            <p className="cta-subtitle">
              Join thousands of companies that trust Employee Manager to streamline their HR processes
            </p>
            <div className="cta-buttons">
              <button className="btn-primary"  onClick={redirectToFreeTrial}>Start Free Trial</button>
              <button className="btn-outline" onClick={redirectToFreeTrial}>Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;