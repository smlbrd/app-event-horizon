import React from 'react';
import Modal from './Modal';

interface CheckoutModalProps {
  show: boolean;
  loading: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CheckoutModal = React.forwardRef<HTMLDivElement, CheckoutModalProps>(
  ({ show, loading, error, onCancel, onConfirm, onBackdropClick }, ref) => (
    <Modal
      show={show}
      onClose={onCancel}
      onBackdropClick={onBackdropClick}
      labelledBy="checkout-modal-title"
      describedBy="checkout-modal-desc"
      ref={ref}
    >
      <div className="modal-header">
        <h2 className="modal-title fs-5" id="checkout-modal-title">
          Confirm RSVP
        </h2>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onCancel}
        />
      </div>
      <div className="modal-body" id="checkout-modal-desc">
        Are you sure you want to RSVP for this event?
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            'Confirm'
          )}
        </button>
      </div>
    </Modal>
  )
);

export default CheckoutModal;
