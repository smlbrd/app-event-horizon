import type { Attendee } from '../types/attendee.types';

interface AttendeeCounterProps {
  attendees: Attendee[];
  onShowAttendees: () => void;
}

const AttendeeCounter = ({
  attendees,
  onShowAttendees,
}: AttendeeCounterProps) => {
  const attendingCount = attendees.filter(
    (a) => a.status === 'attending'
  ).length;

  return (
    <div
      className="mb-3 fw-bold"
      style={{ cursor: 'pointer', textDecoration: 'underline' }}
      onClick={onShowAttendees}
      tabIndex={0}
      role="button"
      aria-label="Show attendees"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onShowAttendees();
        if (e.key === 'Escape') {
          onShowAttendees();
        }
      }}
    >
      {attendingCount > 0 ? (
        <span className="fw-semibold">{attendingCount} going</span>
      ) : null}
    </div>
  );
};

export default AttendeeCounter;
