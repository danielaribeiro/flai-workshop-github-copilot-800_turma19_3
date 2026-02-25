import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function HomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Users',
      description: 'View all registered users and their fitness profiles',
      icon: '👥',
      path: '/users',
      color: 'primary'
    },
    {
      title: 'Activities',
      description: 'Browse all fitness activities and workout logs',
      icon: '🏃',
      path: '/activities',
      color: 'success'
    },
    {
      title: 'Teams',
      description: 'Explore teams and their members',
      icon: '🤝',
      path: '/teams',
      color: 'info'
    },
    {
      title: 'Leaderboard',
      description: 'Check rankings and compete with others',
      icon: '🏆',
      path: '/leaderboard',
      color: 'warning'
    },
    {
      title: 'Workouts',
      description: 'Discover personalized workout suggestions',
      icon: '💪',
      path: '/workouts',
      color: 'danger'
    }
  ];

  return (
    <div className="container mt-5">
      <div className="jumbotron mb-5">
        <h1 className="display-4">Welcome to OctoFit Tracker</h1>
        <p className="lead">Track your fitness activities, compete with your team, and achieve your fitness goals!</p>
        <hr className="my-4" />
        <p>Click on any card below to explore different sections of the app.</p>
      </div>
      
      <div className="row g-4">
        {cards.map((card, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div 
              className="card h-100 shadow-sm hover-card"
              onClick={() => navigate(card.path)}
              style={{ cursor: 'pointer', transition: 'all 0.3s' }}
            >
              <div className="card-body text-center p-4">
                <div className="display-1 mb-3">{card.icon}</div>
                <h5 className="card-title text-primary mb-3">{card.title}</h5>
                <p className="card-text text-muted">{card.description}</p>
              </div>
              <div className="card-footer bg-transparent border-0 pb-3">
                <button className={`btn btn-${card.color} w-100`}>
                  View {card.title}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/octofitapp-logo.png" alt="OctoFit Logo" className="navbar-logo" />
            OctoFit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
