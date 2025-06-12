import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Account.css';

export default function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload.username);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  if (!user) return null;
  return (
    <div className="account">
      <h2>Welcome, {user}</h2>
      <p>Your Claim Climbers dashboard will appear here.</p>
      <button onClick={logout} className="btn-secondary">Log Out</button>
    </div>
  );
}
