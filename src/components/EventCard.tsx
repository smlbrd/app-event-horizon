import { Link } from 'react-router-dom';
import type { Event } from '../types/event.types';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const formattedDateTime = event.start_time
    ? new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  return (
    <article className="card h-100">
      <Link
        to={`/e/${event.id}`}
        className="event-card-link"
        aria-label={`View details for ${event.title}`}
      >
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.image_alt_text || event.title}
            className="card-img-top"
            style={{ objectFit: 'cover', maxHeight: '150px' }}
          />
        )}
        <div className="card-body">
          <h3 className="card-title">{event.title}</h3>
          {event.start_time && (
            <time
              className="card-subtitle mb-2 text-muted"
              dateTime={event.start_time}
            >
              {formattedDateTime}
            </time>
          )}
          {event.location && (
            <div className="card-text">
              <span className="visually-hidden">Location: </span>
              {event.location}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
