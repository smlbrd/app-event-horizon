import React from 'react';
import type { Event } from '../types/event.types';

interface AddToGoogleCalendarButtonProps {
  event: Event;
  className?: string;
  size?: 'sm' | 'lg';
}

const AddToGoogleCalendarButton: React.FC<AddToGoogleCalendarButtonProps> = ({
  event,
  className = '',
  size,
}) => {
  const toGoogleDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');
  };
  const start = toGoogleDateTime(event.start_time);
  const end = toGoogleDateTime(
    event.end_time ||
      new Date(
        new Date(event.start_time).getTime() + 2 * 60 * 60 * 1000
      ).toISOString()
  );
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    event.description || ''
  )}&location=${encodeURIComponent(event.location || '')}`;

  return (
    <button
      type="button"
      className={`btn btn-success${size ? ` btn-${size}` : ''} ${className}`}
      onClick={() => window.open(gcalUrl, '_blank', 'noopener')}
    >
      Add to Google Calendar
    </button>
  );
};

export default AddToGoogleCalendarButton;
