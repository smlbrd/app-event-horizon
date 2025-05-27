export interface Attendee {
  user_id: string;
  event_id: string;
  status: 'attending' | 'cancelled';
}
