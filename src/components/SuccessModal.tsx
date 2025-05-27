import React, { useEffect } from 'react';
import type { Event } from '../types/event.types';

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  event: Event;
}

const SuccessModal = React.forwardRef<HTMLDivElement, SuccessModalProps>(
  ({ show, onClose, event }, ref) => {
    useEffect(() => {
      if (show) {
        document.body.classList.add('modal-blur-active');
      } else {
        document.body.classList.remove('modal-blur-active');
      }
      return () => {
        document.body.classList.remove('modal-blur-active');
      };
    }, [show]);

    useEffect(() => {
      if (!show) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, onClose]);

    if (!show) return null;

    const toGoogleDateTime = (dateStr: string) => {
      const date = new Date(dateStr);
      return date
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}Z$/, 'Z');
    };
    const start = toGoogleDateTime(event.start_time);
    const end = toGoogleDateTime(
      event.end_time ||
        new Date(
          new Date(event.start_time).getTime() + 2 * 60 * 60 * 1000
        ).toISOString()
    );
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description || ''
    )}&location=${encodeURIComponent(event.location || '')}`;

    const formattedDateTime = event.start_time
      ? new Date(event.start_time).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : '';

    return (
      <div
        className="modal fade show"
        style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-desc"
        ref={ref}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="success-modal-title">
                You're going!
              </h2>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div
              className="modal-body"
              id="success-modal-desc"
              aria-live="polite"
            >
              <div className="mb-3">
                <strong>{event.title}</strong>
              </div>
              <div className="mb-3">
                <strong>Date & Time:</strong> {formattedDateTime}
              </div>
              <div className="mb-3">
                <strong>Location:</strong> {event.location}
              </div>
              <div className="alert alert-success mt-3" role="alert">
                Your RSVP has been confirmed.
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => window.open(gcalUrl, '_blank', 'noopener')}
              >
                Add to Google Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SuccessModal;
