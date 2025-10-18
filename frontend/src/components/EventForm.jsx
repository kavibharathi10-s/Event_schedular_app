import React, { useState, useEffect } from 'react';
import { createEvent, updateEvent } from '../api';

export default function EventForm({ onAdded, editingEvent, onUpdated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: ''
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Pre-fill form when editing
  useEffect(() => {
    if (editingEvent) {
      setForm({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        location: editingEvent.location || '',
        startTime: editingEvent.startTime ? editingEvent.startTime.slice(0, 16) : '',
        endTime: editingEvent.endTime ? editingEvent.endTime.slice(0, 16) : ''
      });
    } else {
      setForm({ title: '', description: '', location: '', startTime: '', endTime: '' });
    }
  }, [editingEvent]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.startTime || !form.endTime) {
      alert('Fill title, start and end time');
      return;
    }

    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, form);
        onUpdated && onUpdated();
      } else {
        await createEvent(form);
        onAdded && onAdded();
      }

      // Reset form after submit
      setForm({ title: '', description: '', location: '', startTime: '', endTime: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to save event');
    }
  }

  return (
    <div className="event-page">
      <div className="event-box">
        <h2>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="event-fields">
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} />
            <input type="datetime-local" name="endTime" value={form.endTime} onChange={handleChange} />
          </div>
          <button type="submit">{editingEvent ? 'Update Event' : 'Add Event'}</button>
        </form>
      </div>
    </div>
  );
}
