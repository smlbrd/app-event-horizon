import { useEffect, useState } from 'react';
import Modal from './Modal';
import defaultUserIcon from '../assets/user-icon.png';
import type { Attendee } from '../types/attendee.types';
import type { User } from '../types/user.types';
import { fetchUserProfile } from '../api/api';

interface AttendeesModalProps {
  show: boolean;
  onClose: () => void;
  attendees: Attendee[];
}

interface UserWithStatus extends User {
  status: string;
}

const AttendeesModal = ({ show, onClose, attendees }: AttendeesModalProps) => {
  const [users, setUsers] = useState<UserWithStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'attending' | 'notgoing'>(
    'attending'
  );

  useEffect(() => {
    if (!show) return;
    setLoading(true);

    const token = localStorage.getItem('token') || '';

    Promise.all(
      attendees.map((attendee) =>
        fetchUserProfile(attendee.user_id, token)
          .then((user) => ({ ...user, status: attendee.status }))
          .catch(() => null)
      )
    ).then((results) => {
      setUsers(results.filter(Boolean) as UserWithStatus[]);
      setLoading(false);
    });
  }, [show, attendees]);

  const attendingUsers = users.filter((u) => u.status === 'attending');
  const notGoingUsers = users.filter((u) => u.status === 'cancelled');

  return (
    <Modal show={show} onClose={onClose} labelledBy="attendees-modal-title">
      <div className="p-4">
        <h5 id="attendees-modal-title" className="visually-hidden">
          Attendees
        </h5>
        {loading ? (
          <div>Loading attendees...</div>
        ) : (
          <>
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link${
                    activeTab === 'attending' ? ' active' : ''
                  }`}
                  onClick={() => setActiveTab('attending')}
                  type="button"
                >
                  Attending
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link${
                    activeTab === 'notgoing' ? ' active' : ''
                  }`}
                  onClick={() => setActiveTab('notgoing')}
                  type="button"
                >
                  Not Going
                </button>
              </li>
            </ul>

            {activeTab === 'attending' && (
              <>
                <ul className="list-unstyled">
                  {attendingUsers.length === 0 && (
                    <li className="text-muted">No attendees yet!</li>
                  )}
                  {attendingUsers.map((user) => (
                    <li
                      key={user.id}
                      className="d-flex align-items-center mb-2"
                    >
                      <img
                        src={defaultUserIcon}
                        alt=""
                        width={32}
                        height={32}
                        className="me-2 rounded-circle"
                        style={{ objectFit: 'cover', background: '#eee' }}
                      />
                      <span className="mt-2 py-2 fw-semibold">{user.name}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {activeTab === 'notgoing' && (
              <>
                <ul className="list-unstyled">
                  {notGoingUsers.length === 0 && (
                    <li className="text-muted">
                      Nobody here. Looks like everyone can make it!
                    </li>
                  )}
                  {notGoingUsers.map((user) => (
                    <li
                      key={user.id}
                      className="d-flex align-items-center mb-2"
                    >
                      <img
                        src={defaultUserIcon}
                        alt=""
                        width={32}
                        height={32}
                        className="me-2 rounded-circle"
                        style={{ objectFit: 'cover', background: '#eee' }}
                      />
                      <span className="mt-2 py-2 fw-semibold">{user.name}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        <button className="btn btn-secondary mt-3" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default AttendeesModal;
