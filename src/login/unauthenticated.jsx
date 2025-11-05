import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog.jsx'; 

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function loginUser() {
    await loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    await loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    if (!userName || !password) {
      setDisplayError('Please enter an email and password.');
      return;
    }
    setLoading(true);
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userName, password }),
      });
      if (resp.ok) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const body = await safeJson(resp);
        setDisplayError(`⚠ Error: ${body?.msg || resp.statusText}`);
      }
    } catch {
      setDisplayError('Network error. Is the backend running on :4000?');
    } finally {
      setLoading(false);
    }
  }

  async function safeJson(r) {
    try { return await r.json(); } catch { return null; }
  }

  return (
    <>
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoComplete="current-password"
            required
          />
        </div>

        <Button variant="primary" onClick={loginUser} disabled={loading || !userName || !password}>
          {loading ? 'Working…' : 'Login'}
        </Button>{' '}
        <Button variant="secondary" onClick={createUser} disabled={loading || !userName || !password}>
          {loading ? 'Working…' : 'Create'}
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
