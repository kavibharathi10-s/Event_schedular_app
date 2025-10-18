import React, { useEffect, useState } from 'react';
import { getEvents, deleteEvent } from '../api';

export default function EventList({ refreshKey, setEditingEvent }) { // receive setEditingEvent
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await getEvents();
      setEvents(res.data || []);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [refreshKey]);

  async function handleDelete(id) {
    if (!confirm('Delete this event?')) return;
    await deleteEvent(id);
    load();
  }

  if (loading) return <p>Loading events…</p>;
  if (!events.length) return <p>No events yet.</p>;

  return (
    <ul className="event-list">
      {events.map(ev => (
        <li key={ev._id}>
          <div className="event-info">
            <strong>{ev.title}</strong><br />
            {ev.description && <small>{ev.description}<br/></small>}
            <small>{new Date(ev.startTime).toLocaleString()} — {new Date(ev.endTime).toLocaleString()}</small>
          </div>
          <div>
            <button onClick={() => handleDelete(ev._id)}>Delete</button>
            {/* Pass event to App.js to trigger edit */}
            <button onClick={() => setEditingEvent(ev)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
