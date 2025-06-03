import type { Event } from '../types/event.types';

export const formattedDateTime = (event: Event): [string, string] => {
  const start = event.start_time
    ? new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  const end = event.end_time
    ? new Date(event.end_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  return [start, end];
};
