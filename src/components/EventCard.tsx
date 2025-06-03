import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';
import { fetchAttendeesByEventId } from '../api/api';
import EventSummary from './EventSummary';
import AttendeeCounter from './AttendeeCounter';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    fetchAttendeesByEventId(event.id).then(setAttendees);
  }, [event.id]);

  return (
    <article
      className="card h-100"
      style={{
        minWidth: '200px',
        maxWidth: '350px',
      }}
    >
      <Link
        to={`/e/${event.id}`}
        tabIndex={0}
        className="event-card-link"
        aria-label={`View details for ${event.title}`}
      >
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.image_alt_text || event.title}
            className="card-img-top w-100"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="card-body d-flex flex-column text-start">
          <EventSummary event={event} showDescription={false} />
          <AttendeeCounter attendees={attendees} onShowAttendees={() => {}} />
        </div>
      </Link>
    </article>
  );
}
