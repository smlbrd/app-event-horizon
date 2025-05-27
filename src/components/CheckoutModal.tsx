import React, { useEffect } from 'react';

interface CheckoutModalProps {
  show: boolean;
  loading: boolean;
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  onBackdropClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CheckoutModal = React.forwardRef<HTMLDivElement, CheckoutModalProps>(
  ({ show, loading, error, onCancel, onConfirm, onBackdropClick }, ref) => {
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
        if (e.key === 'Escape') onCancel();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, onCancel]);

    if (!show) return null;

    return (
      <div
        className="modal fade show"
        style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        aria-describedby="checkout-modal-desc"
        ref={ref}
        onClick={onBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
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
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
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
          </div>
        </div>
      </div>
    );
  }
);

export default CheckoutModal;
