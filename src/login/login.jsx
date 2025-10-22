import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthState } from '../auth/authState.js';
import { Unauthenticated } from './Unauthenticated.jsx';
import { Authenticated } from './authenticated.jsx';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Rise and Play</h1>}

        {authState === AuthState.Authenticated && (
          <Authenticated
            userName={userName}
            onLogout={() => onAuthChange('', AuthState.Unauthenticated)}
          />
        )}

        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}
          />
        )}
      </div>
    </main>
  );
}

  return (
    <section className="container-fluid text-center py-5" style={{ backgroundColor: '#f0f4f8' }}>
      <div className="container" style={{ maxWidth: 520 }}>
        <h1 className="fw-bold text-black mb-2">
          Welcome to <span className="text-primary">Rise and Play</span> Pickup Sports
        </h1>
        <p className="text-muted">Log in to find or host a game</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group input-group-lg mb-3">
            <span className="input-group-text">@</span>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="input-group input-group-lg mb-4">
            <span className="input-group-text">🔒</span>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
            />
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="submit" className="btn btn-primary btn-lg px-4">Login</button>
            <Link to="/games" className="btn btn-dark btn-lg px-4" role="button">Create account</Link>
          </div>
        </form>
      </div>
    </section>
  );

