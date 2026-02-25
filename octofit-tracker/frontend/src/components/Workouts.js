import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data received:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts array:', workoutsData);
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading workouts...
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

  const getDifficultyBadge = (difficulty) => {
    if (!difficulty) return 'bg-secondary';
    const lower = difficulty.toLowerCase();
    if (lower === 'easy') return 'bg-success';
    if (lower === 'medium' || lower === 'moderate') return 'bg-warning text-dark';
    if (lower === 'hard' || lower === 'difficult') return 'bg-danger';
    return 'bg-info text-dark';
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Workout Suggestions</h2>
        <span className="badge bg-primary rounded-pill">{workouts.length} Workouts</span>
      </div>
      <div className="row">
        {workouts.map((workout) => (
          <div key={workout.id} className="col-lg-6 col-md-12 mb-4">
            <div className="card h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{workout.name}</h5>
              </div>
              <div className="card-body">
                {workout.description && (
                  <p className="card-text text-muted mb-3">{workout.description}</p>
                )}
                <div className="mb-3">
                  {workout.difficulty && (
                    <span className={`badge ${getDifficultyBadge(workout.difficulty)} me-2`}>
                      {workout.difficulty}
                    </span>
                  )}
                  {workout.duration_minutes && (
                    <span className="badge bg-info text-dark me-2">
                      ⏱️ {workout.duration_minutes} min
                    </span>
                  )}
                  {workout.target_calories && (
                    <span className="badge bg-danger">
                      🔥 {workout.target_calories} cal
                    </span>
                  )}
                </div>
                {workout.exercises && Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
                  <div>
                    <h6 className="text-primary">Exercises:</h6>
                    <ul className="list-group list-group-flush">
                      {workout.exercises.map((exercise, idx) => (
                        <li key={idx} className="list-group-item px-0">
                          <small>✓ {exercise}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="card-footer bg-transparent">
                <button className="btn btn-primary btn-sm w-100">Start Workout</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
