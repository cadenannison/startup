import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog.jsx';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    if (!userName || !password) {
      setDisplayError('Please enter an email and password.');
      return;
    }
    // TODO: replace with real auth call later
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    if (!userName || !password) {
      setDisplayError('Please enter an email and password.');
      return;
    }
    // TODO: replace with real signup call later
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
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

        <Button variant="primary" onClick={loginUser} disabled={!userName || !password}>
          Login
        </Button>{' '}
        <Button variant="secondary" onClick={createUser} disabled={!userName || !password}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
