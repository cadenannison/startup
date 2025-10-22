import React from 'react';

export function Games() {
  return (
    <main>
      <div className="container my-4 cards-grid">
        <div className="card mb-4" id="map-card">
          <div className="card-header">Locations</div>
          <div className="card-body text-center">
            <p className="text-muted my-auto">Google Maps API / third party service call</p>
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
                  <input className="form-control" id="act-location" name="location" placeholder="Location" required />
                </div>

                <div className="col-12 col-md-5">
                  <label htmlFor="act-text" className="form-label visually-hidden">Sport</label>
                  <input className="form-control" id="act-text" name="text" placeholder="Sport" required />
                </div>

                <div className="col-12">
                  <label htmlFor="act-comment" className="form-label visually-hidden">Comment</label>
                  <textarea
                    className="form-control"
                    id="act-comment"
                    name="comment"
                    rows="2"
                    placeholder="Comment (optional)"
                  ></textarea>
                </div>

                <div className="col-6 col-md-2">
                  <label htmlFor="act-username" className="form-label visually-hidden">Username</label>
                  <input className="form-control" id="act-username" name="username" placeholder="Username" defaultValue="Caden" />
                </div>

                <div className="col-6 col-md-1 d-grid">
                  <button className="btn btn-success" type="button">Add</button>
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
              <p className="text-muted m-0 p-3 text-center" data-empty-hint>
                No activities yet!
              </p>
              <ul className="list-group list-group-flush" id="activity-list"></ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
