import { useEffect, useState } from 'react';
import { fetchEvents } from '../api/api';
import type { Event } from '../types/event.types';
import EventCard from './EventCard';

interface EventListProps {
  search: string;
  events?: Event[];
  loading?: boolean;
  error?: string | null;
}

const EventList = ({
  search,
  events: propEvents,
  loading: propLoading,
  error: propError,
}: EventListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (propEvents) return;
    fetchEvents()
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [propEvents]);

  const usedEvents = propEvents ?? events;
  const usedLoading = propLoading ?? (!propEvents && loading);
  const usedError = propError ?? (!propEvents && error);

  const filteredEvents = usedEvents.filter((event) =>
    [event.title, event.description, event.location]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(search.toLowerCase()))
  );

  if (usedLoading)
    return <div className="text-center">Finding your next event...</div>;
  if (usedError)
    return <div className="text-danger text-center">{usedError}</div>;
  if (filteredEvents.length === 0)
    return <div className="text-center">No events found!</div>;

  return (
    <section aria-labelledby="events-heading" className="mt-4 py-4">
      <h1 id="events-heading" className="visually-hidden">
        Events
      </h1>
      <ul
        className="event-list d-flex flex-wrap gap-3 list-unstyled"
        aria-label="Event list"
        role="list"
        style={{ justifyContent: 'center' }}
      >
        {filteredEvents.map((event) => (
          <li
            key={event.id}
            className="flex-grow-1 mb-4"
            style={{ minWidth: 250, maxWidth: 350, flexBasis: '250px' }}
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
