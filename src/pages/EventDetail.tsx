import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';
import {
  fetchEventById,
  fetchAttendeesByEventId,
  addAttendeeToEvent,
} from '../api/api';
import Header from '../components/Header';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import AddToGoogleCalendarButton from '../components/AddToGoogleCalendarButton';
import { formattedDateTime } from '../utils/formattedDateTime';
import AttendeeCounter from '../components/AttendeeCounter';

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rsvp, setRsvp] = useState(false);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingRsvp, setLoadingRsvp] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const checkoutModalRef = useRef<HTMLDivElement>(null);
  const successModalRef = useRef<HTMLDivElement>(null);
  const getTicketsBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    fetchEventById(eventId)
      .then(setEvent)
      .catch(() => setError('Could not load event'))
      .finally(() => setLoading(false));
    fetchAttendeesByEventId(eventId)
      .then((data) => {
        setAttendees(data);
      })
      .catch(() => setAttendees([]));
  }, [eventId]);

  useEffect(() => {
    if (showCheckout && checkoutModalRef.current) {
      checkoutModalRef.current.focus();
    }
    if (showSuccess && successModalRef.current) {
      successModalRef.current.focus();
    }
  }, [showCheckout, showSuccess]);

  useEffect(() => {
    if (!showCheckout && getTicketsBtnRef.current) {
      getTicketsBtnRef.current.focus();
    }
  }, [showCheckout]);

  const handleGetTickets = () => {
    setRsvpError(null);
    setShowCheckout(true);
  };

  const handleConfirmRsvp = async () => {
    if (!eventId) return;
    setLoadingRsvp(true);
    setRsvpError(null);
    try {
      await addAttendeeToEvent(eventId);
      setRsvp(true);
      setShowCheckout(false);
      setShowSuccess(true);
      fetchAttendeesByEventId(eventId)
        .then(setAttendees)
        .catch(() => {});
    } catch (e) {
      setRsvpError('Failed to confirm RSVP. Please try again later.');
      console.log('RSVP error:', e);
      setShowCheckout(true);
    } finally {
      setLoadingRsvp(false);
    }
  };

  if (loading) return <div className="text-center my-5">Loading event...</div>;
  if (error || !event)
    return (
      <div className="text-danger text-center">
        {error || 'Event not found'}
      </div>
    );

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    close: () => void
  ) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    <>
      <Header searchValue="" onSearchChange={() => {}} onSearch={() => {}} />
      <main id="main-content" tabIndex={-1} className="container py-4">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.image_alt_text || event.title}
            className="w-100 mb-4"
            style={{
              maxHeight: 400,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
        <section className="text-start" aria-labelledby="event-title">
          <h1 id="event-title" className="fw-bold mb-3 display-5 display-md-3">
            {event.title}
          </h1>
          <div className="mb-3 text-muted">
            <address>{event.location}</address>
            <time dateTime={event.start_time}>{formattedDateTime(event)}</time>
          </div>
          <AttendeeCounter attendees={attendees} />
          <p className="mb-4 fs-5 fs-md-4">{event.description}</p>
          <button
            ref={getTicketsBtnRef}
            className="btn btn-orange btn-lg px-4 me-2"
            onClick={handleGetTickets}
            disabled={rsvp}
            aria-pressed={rsvp}
            aria-live="polite"
          >
            {rsvp ? 'Going!' : 'Get Tickets'}
          </button>
          {rsvp && (
            <AddToGoogleCalendarButton event={event} className="btn-lg px-4" />
          )}
        </section>
      </main>

      <CheckoutModal
        ref={checkoutModalRef}
        show={showCheckout}
        loading={loadingRsvp}
        error={rsvpError}
        onCancel={() => setShowCheckout(false)}
        onConfirm={handleConfirmRsvp}
        onBackdropClick={(e) =>
          handleBackdropClick(e, () => setShowCheckout(false))
        }
      />
      {event && (
        <SuccessModal
          ref={successModalRef}
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          event={event}
        />
      )}
    </>
  );
};

export default EventDetail;
