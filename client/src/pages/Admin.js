// src/pages/Admin.js
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

const INTEGRATIONS = [
  { label: 'GoHighLevel', key: 'gohighlevel' },
  { label: 'Stripe',       key: 'stripe'       },
  { label: 'DrapCode',     key: 'drapcode'     },
  { label: 'AWS',          key: 'aws'          },
  { label: 'HealthBank1',  key: 'healthbank1'  },
];

const FIELDS_BY_INTEGRATION = {
  gohighlevel: [
    { name: 'apiKey',  label: 'API Key'      },
    { name: 'baseUrl', label: 'API Base URL' },
  ],
  stripe: [
    { name: 'apiKey',        label: 'Secret Key'    },
    { name: 'webhookSecret', label: 'Webhook Secret'},
  ],
  drapcode: [
    { name: 'endpoint', label: 'API Endpoint' },
    { name: 'apiKey',   label: 'API Key'      },
    { name: 'secret',   label: 'API Secret'   },
  ],
  aws: [
    { name: 'accessKeyId',     label: 'Access Key ID'    },
    { name: 'secretAccessKey', label: 'Secret Access Key'},
    { name: 'region',          label: 'AWS Region'       },
  ],
  healthbank1: [
    { name: 'apiKey',  label: 'API Key'      },
    { name: 'baseUrl', label: 'API Base URL' },
  ],
};

export default function Admin() {
  const [selected, setSelected] = useState(INTEGRATIONS[0].key);
  const [config, setConfig]     = useState({});
  const [status, setStatus]     = useState('');

  // fetch current config on mount & when `selected` changes
  useEffect(() => {
    setStatus('Loading…');
    fetch(`/api/admin/integrations/${selected}`)
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .then(data => {
        setConfig(data.data || {});
        setStatus('');
      })
      .catch(() => {
        setConfig({});
        setStatus('Could not load existing settings');
      });
  }, [selected]);

  const handleFieldChange = e => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const saveConfig = () => {
    setStatus('Saving…');
    fetch(`/api/admin/integrations/${selected}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(config),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(() => {
      setStatus('Saved successfully');
      toast.success('Configuration saved');
    })
    .catch(() => {
      setStatus('Error saving configuration');
      toast.error('Failed to save');
    });
  };

  const testConnection = () => {
    setStatus('Testing…');
    fetch(`/api/admin/integrations/${selected}/test`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(config),
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(body => {
      const msg = body.success
        ? 'Connection OK'
        : `Test failed: ${body.error}`;
      setStatus(msg);
      toast.info(msg);
    })
    .catch(() => {
      setStatus('Test failed');
      toast.error('Connection test failed');
    });
  };

  const fields = FIELDS_BY_INTEGRATION[selected] || [];

  return (
    <div className="page">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <h1>Admin → Integrations</h1>

      <div className="form-group">
        <label htmlFor="integration-select">Select Integration</label>
        <select
          id="integration-select"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {INTEGRATIONS.map(i => (
            <option key={i.key} value={i.key}>{i.label}</option>
          ))}
        </select>
      </div>

      <div className="form">
        {fields.map(f => (
          <div className="form-group" key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type="text"
              value={config[f.name] || ''}
              onChange={handleFieldChange}
            />
          </div>
        ))}

        <div className="form-group button-group" style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={saveConfig} className="btn">Save Configuration</button>
          <button onClick={testConnection} className="btn">Test Connection</button>
        </div>

        {status && <p className="status-message">{status}</p>}
      </div>
    </div>
  );
}
