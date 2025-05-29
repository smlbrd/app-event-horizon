import Modal from './Modal';

interface DeleteEventModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  show,
  onClose,
  onDelete,
  loading = false,
}) => (
  <Modal
    show={show}
    onClose={onClose}
    onBackdropClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
    labelledBy="delete-modal-title"
  >
    <div className="p-4 text-center">
      <h5 id="delete-modal-title" className="mb-3">
        Delete Event
      </h5>
      <p>
        Are you sure you want to delete this event? This action cannot be
        undone.
      </p>
      <div className="d-flex gap-2 justify-content-center mt-4">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  </Modal>
);

export default DeleteEventModal;
