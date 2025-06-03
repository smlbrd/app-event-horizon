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
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === 'start_date') {
        if (!prev.end_date || prev.end_date === prev.start_date) {
          updated.end_date = value;
        }
      }

      return updated;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError(null);
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
    setFieldErrors((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const newFieldErrors: { [key: string]: string } = {};

    if (!form.title) newFieldErrors.title = 'Please give your event a title';
    if (!form.description)
      newFieldErrors.description = 'Please give your event a description';
    if (!form.location) newFieldErrors.location = 'Please provide a location';
    if (form.price === null || form.price === undefined)
      newFieldErrors.price = 'Ticket price is required (minimum £0)';
    if (!form.start_date)
      newFieldErrors.start_date = 'Please select a start date';
    if (!form.start_time)
      newFieldErrors.start_time = 'Please select a start time';

    const start_time = combineDateAndTime(form.start_date, form.start_time);
    const end_time = combineDateAndTime(form.end_date, form.end_time);

    if (start_time && end_time && new Date(start_time) >= new Date(end_time)) {
      newFieldErrors.end_time = 'End time must be after start time';
    }

    if (form.image_url && !form.image_url.startsWith('https')) {
      newFieldErrors.image_url = 'Image URL must start with https';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError('Please fill in all required fields.');
      return;
    }

    setFieldErrors({});
    setError(null);

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
        <form onSubmit={handleSubmit} className="fw-semibold text-start">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              className={`form-control${
                fieldErrors.title ? ' is-invalid' : ''
              }`}
              placeholder="Your Event Title"
              value={form.title}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.title}
              aria-describedby={fieldErrors.title ? 'title-error' : undefined}
            />
            {fieldErrors.title && (
              <div className="invalid-feedback" id="title-error">
                {fieldErrors.title}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={`form-control${
                fieldErrors.description ? ' is-invalid' : ''
              }`}
              placeholder="An overview of your event"
              value={form.description}
              onChange={handleChange}
              rows={3}
              aria-invalid={!!fieldErrors.description}
              aria-describedby={
                fieldErrors.description ? 'description-error' : undefined
              }
            />
            {fieldErrors.description && (
              <div className="invalid-feedback" id="description-error">
                {fieldErrors.description}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              name="location"
              className={`form-control${
                fieldErrors.location ? ' is-invalid' : ''
              }`}
              placeholder="Location (e.g. Downtown Innovation Hub or Online)"
              value={form.location}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.location}
              aria-describedby={
                fieldErrors.location ? 'location-error' : undefined
              }
            />
            {fieldErrors.location && (
              <div className="invalid-feedback" id="location-error">
                {fieldErrors.location}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="price">
              Ticket Price (£)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className={`form-control${
                fieldErrors.price ? ' is-invalid' : ''
              }`}
              placeholder="Price"
              min={0}
              value={form.price}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.price}
              aria-describedby={fieldErrors.price ? 'price-error' : undefined}
            />
            {fieldErrors.price && (
              <div className="invalid-feedback" id="price-error">
                {fieldErrors.price}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="start_date">
              Start Date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className={'form-control'}
              value={form.start_date}
              onChange={handleStartChange}
              placeholder={todayDate}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="start_time">
              Start Time
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              className="form-control"
              value={form.start_time}
              onChange={handleStartChange}
              placeholder={todayTime}
              step={900}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="end_date">
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
            <label className="form-label" htmlFor="end_time">
              End Time
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              className="form-control"
              value={form.end_time}
              onChange={handleChange}
              step={900}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="image_url">
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
            <label className="form-label" htmlFor="image_alt_text">
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
