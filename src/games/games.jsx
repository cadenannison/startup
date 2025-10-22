import React from 'react';
import MapBox from './mapBox';
import './map.css';

const STORAGE_KEY = 'rap.activities.v1';

export function Games() {
  const [form, setForm] = React.useState({
    location: '',
    text: '',
    comment: '',
    username: localStorage.getItem('userName') || 'Guest',
  });
  const [adding, setAdding] = React.useState(false);
  const [activities, setActivities] = React.useState([]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setActivities(parsed);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch {}
  }, [activities]);

  async function handleAdd() {
    const location = form.location.trim();
    const text = form.text.trim();
    if (!location || !text) return;

    setAdding(true);
    try {
      const activity = {
        id: safeId(),
        location,
        text,
        comment: form.comment.trim(),
        username: (form.username || '').trim() || 'Guest',
        createdAt: new Date().toISOString(),
      };

      setActivities((list) => [activity, ...list]);
      setForm((f) => ({ ...f, text: '', comment: '' }));

      const el = document.getElementById('newActivityForm');
      if (el && window.bootstrap) {
        const inst = window.bootstrap.Collapse.getOrCreateInstance(el, { toggle: false });
        inst.hide();
      }
    } finally {
      setAdding(false);
    }
  }

  function handleDelete(id) {
    setActivities((list) => list.filter((a) => a.id !== id));
  }

  return (
    <main>
      <div className="container my-4 cards-grid">
        <div className="card mb-4" id="map-card">
          <div className="card-header">Locations</div>
          <div className="card-body p-0">
            <div className="map-wrap">
              <MapBox height="100%" />
            </div>
          </div>
        </div>

        <div className="card" id="activity-card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span className="fw-semibold">Activities</span>
            <button
              className="btn btn-primary btn-sm ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#newActivityForm"
              aria-expanded="false"
              aria-controls="newActivityForm"
            >
              <span aria-hidden="true">+</span> Create activity
            </button>
          </div>

          <div id="newActivityForm" className="collapse border-top">
            <form id="activity-form" className="p-3 p-md-4" action="#" method="post" noValidate>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label htmlFor="act-location" className="form-label visually-hidden">Location</label>
                  <input className="form-control" id="act-location" name="location" placeholder="Location" required value={form.location}
                    onChange={update('location')}/>
                </div>

                <div className="col-12 col-md-5">
                  <label htmlFor="act-text" className="form-label visually-hidden">Sport</label>
                  <input className="form-control" id="act-text" name="text" placeholder="Sport" required value={form.text}
                    onChange={update('text')}/>
                </div>

                <div className="col-12">
                  <label htmlFor="act-comment" className="form-label visually-hidden">Comment</label>
                  <textarea
                    className="form-control"
                    id="act-comment"
                    name="comment"
                    rows="2"
                    placeholder="Comment (optional)"
                    value={form.comment}
                    onChange={update('comment')}
                  ></textarea>
                </div>

                <div className="col-6 col-md-2">
                  <label htmlFor="act-username" className="form-label visually-hidden">Username</label>
                  <input className="form-control" id="act-username" name="username" placeholder="Username" value={form.username}
                    onChange={update('username')}/>
                </div>

                <div className="col-6 col-md-1 d-grid">
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={handleAdd}
                    disabled={adding || !form.location.trim() || !form.text.trim()}
                  >
                    {adding ? 'Adding…' : 'Add'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div
            className="card-body p-0 d-flex flex-column"
            id="activity-container"
            role="region"
            aria-live="polite"
            aria-label="Activities list"
          >
            <div className="px-3 py-2 border-top bg-body-tertiary small text-muted">
              Activity feed
            </div>
            <div className="feed flex-grow-1 overflow-auto">
              {activities.length === 0 ? (
                <p className="text-muted m-0 p-3 text-center" data-empty-hint>
                  No activities yet!
                </p>
              ) : (
                <ul className="list-group list-group-flush" id="activity-list">
                  {activities.map((a) => (
                    <li key={a.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="me-3">
                          <div>
                            <strong>{a.text}</strong> at {a.location}
                            {a.comment ? <span className="text-muted"> — {a.comment}</span> : null}
                          </div>
                          <div className="small text-muted">
                            by {a.username} • {formatWhen(a.createdAt)}
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(a.id)}
                          aria-label={`Delete ${a.text} at ${a.location}`}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function safeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2);
}

function formatWhen(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return ''; }
}
