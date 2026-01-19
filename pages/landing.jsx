import React from "react";
import { useNavigate } from "react-router";

export default function Landing() {
    const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <div className="img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2615/2615096.png"
            alt="logo"
          />
          <h1>
            <span>Url</span>Shortener
          </h1>
        </div>
        <div className="button">
          <button className="up" onClick={()=>navigate("/signUp")}> SignUP</button>
          <button className="in" onClick={()=>navigate("/login")}>SignIn</button>
        </div>
      </div>
      
    
      <div className="center">
      <div className="center-1">
        <div className="center-2">
             <h1>
            <span>Url</span>Shortener
          </h1>
            <p>
            A simple web-app that shorten your <span className="link">Links</span> and create <span className="down">Downloadable</span> <span className="code1">QR-Code</span> and short links that can be use within the app 
            </p>
             <button className="get" onClick={()=>navigate("/signUp")}>Get Started</button>
        </div>
        <img src="https://pngimg.com/d/qr_code_PNG17.png" alt="qrcode image" />
      </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose <span>UrlShortener</span>?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Lightning Fast</h3>
            <p>Instantly shorten your long URLs in seconds with our optimized platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>QR Code Generation</h3>
            <p>Create and download beautiful QR codes for your shortened links</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Analytics</h3>
            <p>Monitor clicks and traffic on your shortened links in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Your links are safe with our enterprise-grade security infrastructure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Access and manage your links seamlessly across all devices</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Custom Slugs</h3>
            <p>Personalize your shortened URLs with custom names and branding</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>How It <span>Works</span></h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Paste Your Link</h3>
            <p>Enter your long URL into our simple input field</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Generate Short Link</h3>
            <p>Click to create an instant shortened URL</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get QR Code</h3>
            <p>Download a custom QR code for your link</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Share & Track</h3>
            <p>Share your link and monitor its performance</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>Trusted by Millions</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>10M+</h3>
            <p>Links Shortened</p>
          </div>
          <div className="stat-card">
            <h3>500K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-card">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat-card">
            <h3>2B+</h3>
            <p>Clicks Tracked</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"UrlShortener has made sharing links so much easier. The QR code feature is a game-changer!"</p>
            <div className="testimonial-author">- Sarah Mitchell</div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Simple, fast, and reliable. I use it every day for my marketing campaigns. Highly recommended!"</p>
            <div className="testimonial-author">- John Rodriguez</div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The analytics dashboard is incredibly helpful for tracking engagement. Love this service!"</p>
            <div className="testimonial-author">- Emma Watson</div>
          </div>
        </div>
      </div>

      
      <div className="final-cta">
        <h2>Ready to Shorten Your Links?</h2>
        <p>Join thousands of users who are already simplifying their sharing experience</p>
        <button className="get" onClick={()=>navigate("/signUp")}>Start Free Today</button>
      </div>

      <footer>
        <h1>UrlShortener © 2026 | Simplifying Your Links</h1>
      </footer>
    </>
  );
}
