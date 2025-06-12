// src/pages/Dashboard.js
import React from 'react'
import { Link } from 'react-router-dom'

const processSteps = [
  {
    key: 'record-review',
    title: 'Record Review',
    status: 'Waiting for Record Review',
    link: '/process/record-review',
    color: 'var(--primary)'
  },
  {
    key: 'nexus-eligibility',
    title: 'Nexus Eligibility',
    status: 'Eligibility List Ready',
    link: '/process/nexus-eligibility',
    color: 'var(--secondary)'
  },
  {
    key: 'nexus-in-process',
    title: 'Nexus Letter – In Process',
    status: 'Drafting Nexus Letter',
    link: '/process/nexus-in-process',
    color: 'var(--accent)'
  },
  {
    key: 'nexus-in-review',
    title: 'Nexus Letter – In Review',
    status: 'Under Provider Review',
    link: '/process/nexus-in-review',
    color: 'var(--accent)'
  },
  {
    key: 'nexus-done',
    title: 'Nexus Letter – Completed',
    status: 'Ready for Delivery',
    link: '/process/nexus-done',
    color: 'var(--accent)'
  },
  {
    key: 'nexus-delivered',
    title: 'Nexus Letter – Delivered',
    status: 'Sent to VA',
    link: '/process/nexus-delivered',
    color: 'var(--accent)'
  },
]

const resourcesData = [
  { title: 'VA Process Guide', description: 'Step-by-step walkthrough of the VA claim process.', link: 'https://claimclimbers.com/articles/va-process-guide' },
  { title: 'Evidence Checklist', description: 'Ensure you have every supporting document.',               link: 'https://claimclimbers.com/articles/evidence-checklist' },
  { title: 'Medical Letter Tips', description: 'Get the most out of your Nexus letters.',               link: 'https://claimclimbers.com/articles/medical-letter-tips' },
]

const supportData = [
  { title: 'Contact Us',      description: 'Email or call our team for help.', link: 'https://claimclimbers.com/contact-us/' },
  { title: 'Schedule a Call', description: 'Book a 15-minute consultation.',    link: 'https://launch.claimclimbers.com/schedule' },
  { title: 'FAQ',             description: 'Quick answers to common questions.', link: 'https://claimclimbers.com/faq' },
]

export default function Dashboard() {
  return (
    <div className="page">
      <header
        className="dashboard-header"
        style={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        <h1>Claim Climbers Process</h1>
        <p>Track each step—from record review through Nexus Letter delivery—right here.</p>
      </header>

      <section className="dashboard-section">
        <h2>Process Flow</h2>
        <div className="dashboard-grid">
          {processSteps.map(step => (
            <Link
              key={step.key}
              to={step.link}
              className="card"
              style={{ textDecoration: 'none' }}
            >
              <h3 style={{ color: step.color }}>{step.title}</h3>
              <p>Status: <strong>{step.status}</strong></p>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-section" style={{ marginTop: '3rem' }}>
        <h2>Resources</h2>
        <div className="dashboard-grid">
          {resourcesData.map(r => (
            <a
              key={r.title}
              href={r.link}
              className="card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 style={{ color: 'var(--secondary)' }}>{r.title}</h3>
              <p>{r.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section
        className="dashboard-section"
        style={{ marginTop: '3rem', marginBottom: '4rem' }}
      >
        <h2>Support</h2>
        <div className="dashboard-grid">
          {supportData.map(s => (
            <a
              key={s.title}
              href={s.link}
              className="card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 style={{ color: 'var(--accent)' }}>{s.title}</h3>
              <p>{s.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
