import { useEffect, useState } from 'react';
import { fetchEvents } from '../api/api';
import type { Event } from '../types/event.types';
import EventCard from './EventCard';

interface EventListProps {
  search: string;
}

const EventList = ({ search }: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) =>
    (event.title ?? '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <div className="text-center">Finding your next event...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (filteredEvents.length === 0)
    return <div className="text-center">No events found!</div>;

  return (
    <section aria-labelledby="events-heading" className="mt-4">
      <h2 id="events-heading" className="visually-hidden">
        Events
      </h2>
      <ul className="row list-unstyled" aria-label="Event list" role="list">
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
            role="listitem"
          >
            <EventCard event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventList;
