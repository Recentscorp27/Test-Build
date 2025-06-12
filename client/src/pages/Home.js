import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Your VA Claim, Our Mission</h1>
          <p>
            At <strong>Claim Climbers</strong>, we empower veterans to navigate the VA disability
            claims process with confidence. Our team of experts is with you every step of the way,
            from record review to Nexus letters and submission.
          </p>
          <a href="/dashboard" className="btn btn-primary">Go to Dashboard</a>
        </div>
        <div className="hero-image">
          {/* replace with your SVG or PNG */}
          <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="Claim Climbers" />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Transparent Process</h3>
            <p>Track every step of your claim in real time—no surprises, no guesswork.</p>
          </div>
          <div className="feature">
            <h3>Veteran-Focused</h3>
            <p>We’re veteran-owned and veteran-driven. Your needs are our top priority.</p>
          </div>
          <div className="feature">
            <h3>Expert Guidance</h3>
            <p>Our record reviewers and letter writers have decades of VA experience.</p>
          </div>
        </div>
      </section>

      <section className="testimonial">
        <blockquote>
          “Claim Climbers walked me through every form, answered every question, and got my
          Nexus letter turned around in days. I couldn’t have done it without them.”
        </blockquote>
        <cite>— Army Veteran, John D.</cite>
      </section>
    </div>
  );
}
