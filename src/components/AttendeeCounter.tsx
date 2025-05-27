import type { Attendee } from '../types/attendee.types';

interface AttendeeCounterProps {
  attendees: Attendee[];
}

const AttendeeCounter = ({ attendees }: AttendeeCounterProps) => {
  const attendingCount = attendees.filter(
    (a) => a.status === 'attending'
  ).length;

  return (
    <div className="text-start mb-3">
      {attendingCount > 0 ? (
        <span className="fw-semibold">{attendingCount} going</span>
      ) : (
        ''
      )}
    </div>
  );
};

export default AttendeeCounter;
