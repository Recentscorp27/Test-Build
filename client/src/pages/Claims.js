// src/pages/Claims.js
import React from 'react'
import { Link } from 'react-router-dom'

const primaryClaims = [
  { id: '12345', title: 'Primary Claim #12345', status: 'Active', link: '/claims/12345' },
  { id: '23456', title: 'Primary Claim #23456', status: 'Evidence Gathering', link: '/claims/23456' },
  { id: '34567', title: 'Primary Claim #34567', status: 'Eligible – Not Started', link: '/claims/34567' },
]

const secondaryClaims = [
  { id: '67890', title: 'Secondary Claim #67890', status: 'Active', link: '/claims/67890' },
  { id: '78901', title: 'Secondary Claim #78901', status: 'Evidence Gathering', link: '/claims/78901' },
  { id: '89012', title: 'Secondary Claim #89012', status: 'Eligible – Not Started', link: '/claims/89012' },
]

function Claims() {
  // helper to group by status
  const groupByStatus = (claims, status) =>
    claims.filter(c => c.status === status)

  const sections = [
    { heading: 'Active Claims',       status: 'Active',             data: primaryClaims.concat(secondaryClaims) },
    { heading: 'Evidence Gathering',  status: 'Evidence Gathering',  data: primaryClaims.concat(secondaryClaims) },
    { heading: 'Eligible (Not Started)', status: 'Eligible – Not Started', data: primaryClaims.concat(secondaryClaims) },
  ]

  return (
    <div className="page">
      <header style={{ marginBottom: '2rem' }}>
        <h1>My Claims</h1>
        <p>View and manage all your primary and secondary disability claims.</p>
      </header>

      {sections.map(({ heading, status, data }) => {
        const items = groupByStatus(data, status)
        if (!items.length) return null

        return (
          <section key={status} style={{ marginBottom: '2.5rem' }}>
            <h2>{heading}</h2>
            <div className="dashboard-grid">
              {items.map(claim => (
                <Link
                  key={claim.id}
                  to={claim.link}
                  className="card"
                  style={{ textDecoration: 'none' }}
                >
                  <h3>{claim.title}</h3>
                  <p>Status: <strong>{claim.status}</strong></p>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* If you want to link out to VA.gov for a specific claim, you could do:
          <a href={`https://va.gov/claim/${claim.id}`} target="_blank" rel="noopener" />
      */}

    </div>
  )
}

export default Claims
