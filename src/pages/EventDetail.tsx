import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';
import {
  fetchEventById,
  fetchAttendeesByEventId,
  addAttendeeToEvent,
  updateEventById,
  deleteEventById,
} from '../api/api';
import Header from '../components/Header';
import CheckoutModal from '../components/CheckoutModal';
import SuccessModal from '../components/SuccessModal';
import DeleteEventModal from '../components/DeleteEventModal';
import AddToGoogleCalendarButton from '../components/AddToGoogleCalendarButton';
import { formattedDateTime } from '../utils/formattedDateTime';
import AttendeeCounter from '../components/AttendeeCounter';
import { useUser } from '../contexts/useUser';
import AttendeesModal from '../components/AttendeeModal';
import SkipToContent from '../components/SkipToContent';

const EventDetail = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { eventId } = useParams<{ eventId: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState('');

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [loadingRsvp, setLoadingRsvp] = useState(false);
  const [rsvpError, setRsvpError] = useState<string | null>(null);

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Event | null>(null);
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const checkoutModalRef = useRef<HTMLDivElement>(null);
  const successModalRef = useRef<HTMLDivElement>(null);
  const getTicketsBtnRef = useRef<HTMLButtonElement>(null);

  const rsvp = !!(user && attendees.some((a) => a.user_id === user.id));
  const canEdit =
    user &&
    event &&
    (user.id === event.created_by ||
      user.role === 'admin' ||
      user.role === 'staff');

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
    if (showCheckoutModal && checkoutModalRef.current) {
      checkoutModalRef.current.focus();
    }
    if (showSuccessModal && successModalRef.current) {
      successModalRef.current.focus();
    }
  }, [showCheckoutModal, showSuccessModal]);

  useEffect(() => {
    if (!showCheckoutModal && getTicketsBtnRef.current) {
      getTicketsBtnRef.current.focus();
    }
  }, [showCheckoutModal]);

  const handleEditClick = () => {
    setEditForm(event);
    setEditMode(true);
    setEditError(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditForm(null);
    setEditError(null);
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId || !editForm) return;
    setEditLoading(true);
    setEditError(null);
    try {
      const updated = await updateEventById(eventId, editForm);
      setEvent(updated);
      setEditMode(false);
      setEditForm(null);
    } catch (e) {
      console.error('Error updating event:', e);
      setEditError('Failed to update event. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEventById(eventId);
    } catch (e) {
      console.error('Error deleting event:', e);
      setEditError('Failed to delete event. Please try again.');
    }
  };

  const handleGetTickets = () => {
    setRsvpError(null);
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleConfirmRsvp = async () => {
    if (!eventId || !user) return;
    setLoadingRsvp(true);
    setRsvpError(null);
    try {
      await addAttendeeToEvent(eventId, user.id, 'attending');
      setShowCheckoutModal(false);
      setShowSuccessModal(true);
      fetchAttendeesByEventId(eventId)
        .then(setAttendees)
        .catch(() => {});
    } catch (e: unknown) {
      console.log(e);
      setRsvpError('Failed to confirm RSVP. Please try again later.');
      setShowCheckoutModal(true);
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

  const handleSearch = (value?: string) => {
    navigate(`/?search=${encodeURIComponent(value ?? '')}`);
  };

  return (
    <>
      <SkipToContent />
      <Header
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
      />
      <main id="main-content" tabIndex={-1} className="py-4">
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
        <section
          className="text-start position-relative"
          aria-labelledby="event-title"
        >
          {canEdit && !editMode && (
            <button
              className="btn btn-sm btn-outline-secondary position-absolute"
              style={{ top: 0, right: 0, zIndex: 2 }}
              onClick={handleEditClick}
              aria-label="Edit event"
            >
              ✏️ Edit
            </button>
          )}

          {editMode && editForm ? (
            <form onSubmit={handleEditSave} className="mb-4">
              {editError && (
                <div className="alert alert-danger">{editError}</div>
              )}
              <label className="form-label fw-semibold" htmlFor="title">
                Event Name
              </label>
              <input
                className="form-control mb-2"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder={event.title}
                required
              />
              <label className="form-label fw-semibold" htmlFor="description">
                Event Overview
              </label>
              <textarea
                className="form-control mb-2"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder={event.description}
                required
                rows={3}
              />
              <label className="form-label fw-semibold" htmlFor="location">
                Location
              </label>
              <input
                className="form-control mb-2"
                name="location"
                value={editForm.location}
                onChange={handleEditChange}
                placeholder={event.location}
                required
              />
              <label className="form-label fw-semibold" htmlFor="price">
                Ticket Price
              </label>
              <input
                className="form-control mb-2"
                name="price"
                type="number"
                value={editForm.price}
                onChange={handleEditChange}
                placeholder={String(event.price)}
                min={0}
                required
              />
              <label className="form-label fw-semibold" htmlFor="start_time">
                Event Start
              </label>
              <input
                className="form-control mb-2"
                name="start_time"
                type="datetime-local"
                value={editForm.start_time.slice(0, 16)}
                onChange={handleEditChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="end_time">
                Event End
              </label>
              <input
                className="form-control mb-2"
                name="end_time"
                type="datetime-local"
                value={editForm.end_time.slice(0, 16)}
                onChange={handleEditChange}
                required
              />
              <label className="form-label fw-semibold" htmlFor="image_url">
                Image URL ('https://your-image-url')
              </label>
              <input
                className="form-control mb-2"
                name="image_url"
                value={editForm.image_url || ''}
                onChange={handleEditChange}
                placeholder={event.image_url || ''}
              />
              <label
                className="form-label fw-semibold"
                htmlFor="image_alt_text"
              >
                Image Alt Text
              </label>
              <input
                className="form-control mb-2"
                name="image_alt_text"
                value={editForm.image_alt_text || ''}
                onChange={handleEditChange}
                placeholder={event.image_alt_text || ''}
              />
              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={editLoading}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={handleEditCancel}
                  disabled={editLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger ms-auto"
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={editLoading}
                >
                  Delete
                </button>
              </div>
            </form>
          ) : (
            <>
              <h3
                id="event-title"
                className="fw-bold mb-3 display-5 display-md-3"
                style={{ maxWidth: '90%' }}
              >
                {event.title}
              </h3>
              <div className="mb-3 text-muted">
                <address>{event.location}</address>
                {event.price > 0 ? (
                  <p className="mb-3">
                    Ticket price: <strong>£{event.price}</strong>
                  </p>
                ) : (
                  <p className="mb-3">Free to attend</p>
                )}
                <time dateTime={event.start_time}>
                  {formattedDateTime(event)[0]}
                </time>
                <time dateTime={event.end_time}>
                  {' '}
                  - {formattedDateTime(event)[1]}
                </time>
              </div>
              <AttendeeCounter
                attendees={attendees}
                onShowAttendees={() => setShowAttendeesModal(true)}
              />
              <AttendeesModal
                show={showAttendeesModal}
                onClose={() => setShowAttendeesModal(false)}
                attendees={attendees}
              />
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
                <AddToGoogleCalendarButton
                  event={event}
                  className="btn-lg px-4"
                />
              )}
            </>
          )}
        </section>
      </main>

      <CheckoutModal
        ref={checkoutModalRef}
        show={showCheckoutModal}
        loading={loadingRsvp}
        error={rsvpError}
        onCancel={() => setShowCheckoutModal(false)}
        onConfirm={handleConfirmRsvp}
        onBackdropClick={(e) =>
          handleBackdropClick(e, () => setShowCheckoutModal(false))
        }
      />
      {event && (
        <SuccessModal
          ref={successModalRef}
          show={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          event={event}
        />
      )}

      <DeleteEventModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        loading={editLoading}
        onDelete={async () => {
          await handleDeleteEvent(event.id);
          setShowDeleteModal(false);
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            navigate('/');
          }, 3000);
        }}
      />

      <div
        className={`toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4 ${
          showToast ? 'show' : ''
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        tabIndex={0}
        style={{ zIndex: 9999, minWidth: 200 }}
      >
        <div className="d-flex">
          <div className="toast-body">Event deleted!</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            aria-label="Close toast"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </>
  );
};

export default EventDetail;
