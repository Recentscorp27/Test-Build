import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-hero">
        <h1>Welcome to Claim Climbers</h1>
        <p>Your veteran-owned partner in navigating VA disability claims.</p>
        <Link to="/login" className="landing-btn">Get Started</Link>
      </header>

      <section className="landing-why">
        <h2>Why Veterans Choose Us</h2>
        <ul>
          <li><strong>Expert Record Reviews</strong> by our veteran-owned team.</li>
          <li><strong>Nexus Letters</strong> grounded in clinical expertise.</li>
          <li><strong>Real-Time Tracking</strong> from Intake to Decision.</li>
          <li><strong>Secure Messaging</strong> with file attachments.</li>
          <li><strong>Resource Hub</strong> with guides, checklists, and videos.</li>
        </ul>
      </section>
    </div>
  );
}
