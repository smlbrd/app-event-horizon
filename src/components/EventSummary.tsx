import type { Event } from '../types/event.types';
import { formattedDateTime } from '../utils/formattedDateTime';

interface EventSummaryProps {
  event: Event;
  showDescription?: boolean;
}

const EventSummary = ({ event, showDescription = true }: EventSummaryProps) => {
  return (
    <article className="text-start">
      <div className="mb-3">
        <strong>{event.title}</strong>
      </div>
      <div className="mb-3">
        <time>{formattedDateTime(event)}</time>
      </div>
      <div className="mb-3">
        <address>{event.location}</address>
      </div>
      {showDescription && event.description && (
        <div className="mb-3">
          <strong>Overview</strong>
          <div>{event.description}</div>
        </div>
      )}
    </article>
  );
};

export default EventSummary;
