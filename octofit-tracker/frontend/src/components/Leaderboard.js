import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data received:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard array:', leaderboardData);
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading leaderboard...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-warning text-dark';
    if (rank === 2) return 'bg-secondary';
    if (rank === 3) return 'bg-danger';
    return 'bg-primary';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏃';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Leaderboard</h2>
        <span className="badge bg-primary rounded-pill">{leaderboard.length} Competitors</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" className="text-center">Rank</th>
              <th scope="col">User</th>
              <th scope="col">Team</th>
              <th scope="col" className="text-center">Total Points</th>
              <th scope="col" className="text-center">Total Activities</th>
              <th scope="col" className="text-center">Total Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              return (
                <tr key={entry.id}>
                  <td className="text-center">
                    <span className={`badge ${getRankBadge(rank)} rounded-pill`}>
                      {getRankIcon(rank)} #{rank}
                    </span>
                  </td>
                  <td>
                    <strong>{entry.user?.username || 'Unknown'}</strong>
                  </td>
                  <td>
                    {entry.team ? (
                      <span className="badge bg-info text-dark">{entry.team.name}</span>
                    ) : (
                      <span className="text-muted">No Team</span>
                    )}
                  </td>
                  <td className="text-center">
                    <span className="badge bg-success rounded-pill">{entry.total_points || 0}</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-info text-dark rounded-pill">{entry.total_activities || 0}</span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-danger rounded-pill">{entry.total_calories || 0} cal</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
