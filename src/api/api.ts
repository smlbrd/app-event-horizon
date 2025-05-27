import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';
import type { User } from '../types/user.types';

const API_URL = 'https://event-horizon-api.up.railway.app/api';

export async function createUserLogin(
  username: string,
  password: string
): Promise<{ user: User; token: string }> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message || 'Failed to login');
  }

  const data = await response.json();

  return { user: data.user, token: data.token };
}

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

export async function addAttendeeToEvent(
  event_id: string,
  user_id: string,
  status: string
) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/events/${event_id}/attendees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ user_id, status }),
  });

  if (!response.ok) throw new Error('Failed to add attendee to event');

  return response.json();
}

export async function createUser(
  username: string,
  password: string,
  email: string,
  name: string
): Promise<{
  token: string;
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email, name }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create user');
  }

  return data;
}

export async function fetchUserProfile(
  user_id: string,
  token: string
): Promise<User> {
  const response = await fetch(`${API_URL}/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user profile');
  return response.json();
}
