import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthState } from './authState.js';
import { Unauthenticated } from './Unauthenticated.jsx';
import { Authenticated } from './Authenticated.jsx';

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

