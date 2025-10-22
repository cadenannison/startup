import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    onLogout();
  }

  return (
    <div className="text-center">
      <div className="fs-4 mb-3">Logged in as <strong>{userName}</strong></div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button variant="primary" onClick={() => navigate('/games')}>Go to games</Button>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}