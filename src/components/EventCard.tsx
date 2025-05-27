import { Link } from 'react-router-dom';
import type { Event } from '../types/event.types';
import EventSummary from './EventSummary';

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="card h-100">
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
        <div className="card-body d-flex flex-column">
          <EventSummary event={event} showDescription={false} />
        </div>
      </Link>
    </article>
  );
}
