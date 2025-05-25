import { useEffect, useState } from 'react';
import { fetchEvents } from '../api/api';
import type { Event } from '../types/event.types';
import EventCard from './EventCard';

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center">Finding your next event...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (events.length === 0)
    return <div className="text-center">No events found!</div>;

  return (
    <section aria-labelledby="events-heading">
      <h2 id="events-heading" className="visually-hidden">
        Events
      </h2>
      <ul className="row list-unstyled" aria-label="Event list">
        {events.map((event) => (
          <li className="col-md-4 mb-4 d-flex" key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventList;
