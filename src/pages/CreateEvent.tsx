import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewEvent } from '../api/api';

const defaultImage =
  'https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function combineDateAndTime(date: string, time: string) {
  if (!date || !time) return '';
  return new Date(`${date}T${time}`).toISOString();
}

const today = new Date();
const todayDate = today.toISOString().slice(0, 10);
const todayTime = today.toTimeString().slice(0, 5);

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: 0,
    start_date: todayDate,
    start_time: todayTime,
    end_date: '',
    end_time: '',
    image_url: defaultImage,
    image_alt_text:
      'A blurred image of lights strung across the ceiling of a venue.',
  });
  const [error, setError] = useState<string | null>(null);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'start_date' || name === 'start_time') {
        if (
          updated.start_date &&
          updated.start_time &&
          (!updated.end_date || !updated.end_time)
        ) {
          const start = new Date(`${updated.start_date}T${updated.start_time}`);
          const end = new Date(start.getTime() + 60 * 60 * 1000);
          updated.end_date = end.toISOString().slice(0, 10);
          updated.end_time = end.toISOString().slice(11, 16);
        }
      }
      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const start_time = combineDateAndTime(form.start_date, form.start_time);
    const end_time = combineDateAndTime(form.end_date, form.end_time);

    if (
      !form.title ||
      !form.description ||
      !form.location ||
      form.price === null ||
      form.price === undefined ||
      start_time === '' ||
      end_time === ''
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    if (new Date(start_time) >= new Date(end_time)) {
      setError('End time must be after start time.');
      return;
    }

    if (form.price < 0) {
      setError('Price cannot be negative.');
      return;
    }
    if (form.image_url && !form.image_url.startsWith('http')) {
      setError('Image URL must start with http or https.');
      return;
    }

    try {
      await createNewEvent({
        ...form,
        start_time,
        end_time,
      });
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again later.');
    }

    navigate('/');
  };

  return (
    <main
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="card"
        style={{ maxWidth: 500, width: '90vw', padding: '2rem' }}
      >
        <h2 className="mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="form-control"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              className="form-control"
              placeholder="Location (e.g. Downtown Innovation Hub or Online)"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              min={0}
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="start_date">
              Start Date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="form-control"
              value={form.start_date}
              onChange={handleStartChange}
              required
              placeholder={todayDate}
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="start_time">
              Start Time
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              className="form-control"
              value={form.start_time}
              onChange={handleStartChange}
              required
              placeholder={todayTime}
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="end_date">
              End Date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="form-control"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="end_time">
              End Time
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              className="form-control"
              value={form.end_time}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="image_url">
              Image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              className="form-control"
              placeholder="Image URL"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label visually-hidden"
              htmlFor="image_alt_text"
            >
              Image Alt Text
            </label>
            <input
              id="image_alt_text"
              name="image_alt_text"
              className="form-control"
              placeholder="Image Alt Text"
              value={form.image_alt_text}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-success w-100" type="submit">
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateEvent;
