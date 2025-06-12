// client/src/pages/Dashboard.js
import React from 'react';

function Dashboard() {
  return (
    <main className="page dashboard-page">
      <section className="dashboard-header">
        <h1>Welcome, Veteran!</h1>
        <p>Here's an overview of your claims and resources.</p>
      </section>
      <section className="dashboard-cards">
        <div className="card">
          <h2>My Claims</h2>
          <ul>
            <li><a href="https://va.gov">Current Claim #12345</a></li>
            <li><a href="https://va.gov">Pending Claim #67890</a></li>
            <li><a href="https://va.gov">Appeal Claim #24680</a></li>
          </ul>
        </div>
        <div className="card">
          <h2>Resources</h2>
          <ul>
            <li><a href="https://claimclimbers.com/articles/">VA Process Guide</a></li>
            <li><a href="https://claimclimbers.com/articles/">Evidence Checklist</a></li>
            <li><a href="https://claimclimbers.com/articles/">Medical Letter Tips</a></li>
          </ul>
        </div>
        <div className="card">
          <h2>Support</h2>
          <ul>
            <li><a href="https://claimclimbers.com/contact-us/">Contact Us</a></li>
            <li><a href="https://claimclimbers.com/contact-us/">Schedule a Call</a></li>
            <li><a href="https://claimclimbers.com/contact-us/">FAQ</a></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;