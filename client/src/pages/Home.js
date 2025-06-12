// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <header className="hero page">
      <div className="hero-content">
        <h1>Your VA Claim. Our Mission.</h1>
        <p>
          At <strong>Claim Climbers</strong>, we empower veterans with expert record reviews,
          Nexus letters, and full support—every step of the way. Transparency, fairness, and
          advocacy—because you deserve the best.
        </p>
        <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
      </div>

      <div className="features">
        <Link to="/dashboard" className="feature">
          <h2>Real-Time Tracking</h2>
          <p>See each milestone in your claim journey—from Intake to Decision.</p>
        </Link>

        <Link to="/dashboard" className="feature">
          <h2>Secure Messaging</h2>
          <p>Encrypted chat with our team to upload documents or ask questions.</p>
        </Link>

        <Link to="/resources" className="feature">
          <h2>Educational Resources</h2>
          <p>Guides, checklists, and videos to make the VA process simple.</p>
        </Link>
      </div>
    </header>
  );
}
