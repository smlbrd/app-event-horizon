import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';
import { fetchEventById, fetchAttendeesByEventId } from '../api/api';
import Header from '../components/Header';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rsvp, setRsvp] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    fetchEventById(eventId)
      .then(setEvent)
      .catch(() => setError('Could not load event'))
      .finally(() => setLoading(false));
    fetchAttendeesByEventId(eventId)
      .then(setAttendees)
      .catch(() => setAttendees([]));
  }, [eventId]);

  if (loading) return <div className="text-center my-5">Loading event...</div>;
  if (error || !event)
    return (
      <div className="text-danger text-center">
        {error || 'Event not found'}
      </div>
    );

  const formattedDateTime = event.start_time
    ? new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  const going = attendees.filter((a) => a.status === 'attending');

  return (
    <>
      <Header searchValue="" onSearchChange={() => {}} onSearch={() => {}} />
      <main id="main-content" tabIndex={-1} className="container py-4">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.image_alt_text || event.title}
            className="w-100 mb-4"
            style={{
              maxHeight: 400,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        <section className="text-start" aria-labelledby="event-title">
          <h1 id="event-title" className="fw-bold mb-3 display-5 display-md-3">
            {event.title}
          </h1>
          <div className="mb-3 text-muted">
            <div>
              <strong>Location:</strong> {event.location}
            </div>
            <div>
              <strong>Time:</strong>{' '}
              <time dateTime={event.start_time}>{formattedDateTime}</time>
            </div>
          </div>
          <div className="mb-3">
            {going.length > 0 ? (
              <span className="fw-semibold">{going.length} going</span>
            ) : (
              <span className="fw-semibold text-secondary">
                Be the first to get tickets!
              </span>
            )}
          </div>
          <p className="mb-4 fs-5 fs-md-4">{event.description}</p>
          <button
            className="btn btn-orange btn-lg px-4"
            onClick={() => setRsvp(true)}
            disabled={rsvp}
            aria-pressed={rsvp}
            aria-live="polite"
          >
            {rsvp ? 'Going!' : 'Get Tickets'}
          </button>
        </section>
      </main>
    </>
  );
};

export default EventDetail;
