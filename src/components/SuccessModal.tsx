import React from 'react';
import type { Event } from '../types/event.types';
import Modal from './Modal';
import EventSummary from './EventSummary';
import AddToGoogleCalendarButton from './AddToGoogleCalendarButton';

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  event: Event;
}

const SuccessModal = React.forwardRef<HTMLDivElement, SuccessModalProps>(
  ({ show, onClose, event }, ref) => (
    <Modal
      show={show}
      onClose={onClose}
      labelledBy="success-modal-title"
      describedBy="success-modal-desc"
      ref={ref}
      onBackdropClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
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
      <div className="modal-body" id="success-modal-desc" aria-live="polite">
        <EventSummary event={event} />
        <div className="alert alert-success mt-3" role="alert">
          Your RSVP has been confirmed.
        </div>
      </div>
      <div className="modal-footer">
        <AddToGoogleCalendarButton event={event} />
      </div>
    </Modal>
  )
);

export default SuccessModal;
