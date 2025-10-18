import React, { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {showSignup ? <Signup /> : <Login />}
        <button className="toggle-btn" onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Go to Login' : 'Go to Signup'}
        </button>
      </div>
    );
  }

  return (
    <div className="event-page">
      {/* Top bar with user info */}
      <div className="top-bar">
        <div className="logo">Event Planner</div>
        <div className="user-info">
        
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Event Form & List */}
      <EventForm 
       editingEvent={editingEvent} 
       onAdded={() => setRefreshKey(prev => prev + 1)} 
       onUpdated={() => { setRefreshKey(prev => prev + 1); setEditingEvent(null); }}
        />
      <EventList refreshKey={refreshKey} setEditingEvent={setEditingEvent} />
    </div>
  );
}

export default App;
