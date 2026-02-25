import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data received:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities array:', activitiesData);
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container mt-4">
      <div className="alert alert-info" role="alert">
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Loading activities...
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Activity Log</h2>
        <span className="badge bg-primary rounded-pill">{activities.length} Activities</span>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Activity Type</th>
              <th scope="col">User</th>
              <th scope="col" className="text-center">Duration</th>
              <th scope="col" className="text-center">Calories</th>
              <th scope="col" className="text-center">Distance</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <strong className="text-primary">{activity.activity_type}</strong>
                </td>
                <td>{activity.user?.username || 'Unknown'}</td>
                <td className="text-center">
                  <span className="badge bg-info text-dark">{activity.duration_minutes} min</span>
                </td>
                <td className="text-center">
                  <span className="badge bg-danger">{activity.calories_burned} cal</span>
                </td>
                <td className="text-center">
                  {activity.distance_km ? (
                    <span className="badge bg-success">{activity.distance_km} km</span>
                  ) : (
                    <span className="text-muted">N/A</span>
                  )}
                </td>
                <td>
                  {activity.created_at ? (
                    new Date(activity.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  ) : (
                    <span className="text-muted">No date</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
