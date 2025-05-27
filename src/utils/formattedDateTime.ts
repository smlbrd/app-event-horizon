import type { Event } from '../types/event.types';

export const formattedDateTime = (event: Event) =>
  event.start_time
    ? new Date(event.start_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';
