// src/App.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './assets/logo.svg';
import './App.css';

// your page components
import Dashboard from './pages/Dashboard';
import Claims    from './pages/Claims';
import Resources from './pages/Resources';
import Support   from './pages/Support';
import Upload    from './pages/Upload';       // ← NEW

function Home() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>Your VA Claim. Our Mission.</h1>
        <p>
          At <strong>Claim Climbers</strong>, we empower veterans with expert record reviews,
          Nexus letters, and full support—every step of the way. Transparency, fairness, and
          advocacy—because you deserve the best.
        </p>
        <Link to="/dashboard" className="btn-primary">
          Go to Dashboard
        </Link>
      </div>

      <div className="features">
        <a
          href="https://launch.claimclimbers.com"
          target="_blank"
          rel="noopener noreferrer"
          className="feature"
          title="Real-Time Tracking"
        >
          <h2>Real-Time Tracking</h2>
          <p>See each milestone in your claim journey—from Intake to Decision.</p>
        </a>

        <a
          href="https://launch.claimclimbers.com"
          target="_blank"
          rel="noopener noreferrer"
          className="feature"
          title="Secure Messaging"
        >
          <h2>Secure Messaging</h2>
          <p>Encrypted chat with our team to upload documents or ask questions.</p>
        </a>

        <a
          href="https://www.youtube.com/@ClaimClimbers"
          target="_blank"
          rel="noopener noreferrer"
          className="feature"
          title="Educational Resources"
        >
          <h2>Educational Resources</h2>
          <p>Guides, checklists, and videos to make the VA process simple.</p>
        </a>
      </div>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Claim Climbers Logo" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li>
            <a href="https://va.gov" target="_blank" rel="noopener noreferrer">
              My Claims
            </a>
          </li>
          <li>
            <a href="https://claimclimbers.com/articles/" target="_blank" rel="noopener noreferrer">
              Resources
            </a>
          </li>
          <li>
            <a href="https://claimclimbers.com/contact-us/" target="_blank" rel="noopener noreferrer">
              Support
            </a>
          </li>
          <li><Link to="/upload">Upload</Link></li>   {/* ← NEW */}
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims"    element={<Claims />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/support"   element={<Support />} />
          <Route path="/upload"    element={<Upload />} />   {/* ← NEW */}
          {/* catch-all: redirect unknown paths to home */}
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Claim Climbers. Veteran-Owned &amp; Operated.</p>
      </footer>
    </div>
  );
}

export default App;
