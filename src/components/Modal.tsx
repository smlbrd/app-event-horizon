import React, { useEffect, type ReactNode, type ForwardedRef } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onBackdropClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  labelledBy?: string;
  describedBy?: string;
  children: ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    { show, onClose, onBackdropClick, labelledBy, describedBy, children },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    useEffect(() => {
      if (!show) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, onClose]);

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

    return (
      <div
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        ref={ref}
        onClick={onBackdropClick}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  }
);

export default Modal;
