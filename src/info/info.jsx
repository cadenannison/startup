import React from 'react';

export function Info() {
  return (
    <main>
    <section className="info-hero mb-3">
      <h2 className="info-title m-0">Information</h2>
      <p className="info-kicker text-muted mt-2">
      How Rise and Play connects people for easy, local pickup games.
      </p>
    </section>

    <section className="info-body">
      <div className="content-panel">
        <p className="mb-3">
          Welcome to <strong>Rise and Play Pickup Sports</strong>! Our platform is dedicated to
          connecting sports enthusiasts for casual and competitive games. Whether you're looking to
          join a local pickup game or organize your own, we've got you covered.
        </p>
        <ul className="info-list mb-0">
          <li>Fast event creation with location + time</li>
          <li>Real time updates and RSVPs</li>
          <li>Use on both computer and mobile</li>
        </ul>
      </div>

      <figure className="image-panel">
        <img
          src="/images/RiseandPlay.jpg"
          alt="Rise and Play Logo"
          className="img-fluid info-image rounded-4 shadow-lg" />
      </figure>
    </section>
  </main>
  );
}