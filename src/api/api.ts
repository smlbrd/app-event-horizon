import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';

const API_URL = 'https://event-horizon-api.up.railway.app/api';

export async function fetchEvents(): Promise<Event[]> {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) throw new Error('Failed to fetch events');

  const data = await response.json();

  return data;
}

export async function fetchEventById(event_id: string): Promise<Event> {
  const response = await fetch(`${API_URL}/events/${event_id}`);

  if (!response.ok)
    throw new Error(`Failed to fetch event with ID: ${event_id}`);

  const data = await response.json();

  return data;
}

export async function fetchAttendeesByEventId(
  event_id: string
): Promise<Attendee[]> {
  const response = await fetch(`${API_URL}/events/${event_id}/attendees`);

  if (!response.ok)
    throw new Error(`Failed to fetch attendees for event ID: ${event_id}`);

  const data = await response.json();

  return data;
}

export async function addAttendeeToEvent(event_id: string) {
  const response = await fetch(`${API_URL}/events/${event_id}/attendees`);

  if (!response.ok) throw new Error('Failed to add attendee to event');

  const data = await response.json();

  return data;
}
