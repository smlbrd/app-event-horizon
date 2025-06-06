import type { Attendee } from '../types/attendee.types';

interface AttendeeCounterProps {
  attendees: Attendee[];
  onShowAttendees?: () => void;
}

const AttendeeCounter = ({
  attendees,
  onShowAttendees,
}: AttendeeCounterProps) => {
  const attendingCount = attendees.filter(
    (a) => a.status === 'attending'
  ).length;

  if (attendingCount === 0) return null;

  if (!onShowAttendees) {
    return (
      <div className="mb-3 fw-bold">
        <span className="fw-semibold">{attendingCount} going</span>
      </div>
    );
  }

  return (
    <div
      className="mb-3 fw-bold text-decoration-none"
      style={{ cursor: 'pointer', textDecoration: 'underline' }}
      onClick={onShowAttendees}
      tabIndex={0}
      role="button"
      aria-label="Show attendees"
      onKeyDown={(e) => {
        if (
          (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') &&
          onShowAttendees
        ) {
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
