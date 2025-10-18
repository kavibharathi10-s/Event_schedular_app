import React, { useState } from 'react';
import { createEvent } from '../api';

export default function EventForm({ onAdded }) {
  const [form, setForm] = useState({
    title: '', description: '', location: '', startTime: '', endTime: ''
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.startTime || !form.endTime) {
      alert('Fill title, start and end time');
      return;
    }
    try {
      await createEvent(form);
      setForm({ title: '', description: '', location: '', startTime: '', endTime: '' });
      onAdded && onAdded();
    } catch (err) {
      console.error(err);
      alert('Failed to create event');
    }
  }

  return (
 <div className="event-page">
      <div className="event-box">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="event-fields">
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} />
            <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}
