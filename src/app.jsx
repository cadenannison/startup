import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './games/games';
import { Scores } from './info/info';

export default function App() {
  const [username] = useState('Guest'); // replace with real auth later

  return (
    <BrowserRouter>
    <div className="d-flex flex-column min-vh-100">
      <header>
        <div className="container header-top">
          <h1 className="site-title m-0">Rise and Play</h1>
          <div id="user-info" className="user-info">
            Logged in as:&nbsp;<span id="username" className="username">{username}</span>
          </div>
        </div>

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="index.html">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" to="games.html" aria-current="page">Games</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="info.html">Info</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/games' element={<Games />} />
        <Route path='/info' element={<Info />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className="games-footer bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">By Caden Annison</span>
          <a className="text-reset" href="https://github.com/cadenannison/startup">GitHub</a>
        </div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

// const loggedInUser = "Guest"; 
// document.getElementById("username").textContent = loggedInUser;