import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token,    setToken]    = useState('');
  const [error,    setError]    = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, token })
      });
      const body = await res.json();
      if (!body.success) return setError(body.error);
      localStorage.setItem('token', body.data.token);
      navigate('/account');
    } catch {
      setError('Network error – please try again.');
    }
  }

  return (
    <div className="login">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          2FA Code
          <input
            type="text"
            value={token}
            onChange={e=>setToken(e.target.value)}
            required
            placeholder="123456"
          />
        </label>
        <button type="submit" className="btn-primary">Sign In</button>
      </form>
    </div>
  );
}
