// client/src/App.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import logo from './assets/logo.svg';
import './App.css';

import Home      from './pages/Home';
import Dashboard from './pages/Dashboard';
import Claims    from './pages/Claims';
import Resources from './pages/Resources';
import Support   from './pages/Support';
import Upload    from './pages/Upload';
import Admin     from './pages/Admin';

export default function App() {
  return (
    <div className="App page">
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Claim Climbers Logo" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/claims">My Claims</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/support">Support</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims"    element={<Claims />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/support"   element={<Support />} />
          <Route path="/upload"    element={<Upload />} />
          <Route path="/admin"     element={<Admin />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Claim Climbers. Veteran-Owned &amp; Operated.</p>
      </footer>
    </div>
  );
}
