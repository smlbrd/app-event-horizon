import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eventHorizonLogo from '../assets/icons8-sun.svg';
import userIcon from '../assets/user-icon.png';

const isLoggedIn = false;

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogoClick = () => {
    if (isLoggedIn) setDropdownOpen((open) => !open);
    else navigate('/');
  };

  return (
    <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
      <div className="d-flex align-items-center">
        <Link
          to="/"
          tabIndex={0}
          className="me-2 d-flex align-items-center text-decoration-none"
        >
          <img
            src={eventHorizonLogo}
            alt="Event Horizon Logo"
            style={{ height: 40, cursor: 'pointer' }}
          />
          <span className="fs-4 fw-bold ms-2 text-dark d-none d-md-inline">
            event horizon
          </span>
        </Link>
      </div>
      <div
        className="d-flex align-items-center"
        style={{ minWidth: 180, justifyContent: 'flex-end' }}
      >
        {isLoggedIn ? (
          <div ref={dropdownRef} className="position-relative">
            <img
              src={userIcon}
              alt="User Icon"
              style={{ height: 40, cursor: 'pointer' }}
              onClick={handleLogoClick}
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Open user menu"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
            />
            {dropdownOpen && (
              <ul
                className="dropdown-menu show dropdown-menu-end"
                style={{ right: 0, left: 'auto', top: '110%' }}
                role="menu"
              >
                <li role="menuitem">
                  <Link
                    to="/create"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Create New
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    to="/my-events"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Events
                  </Link>
                </li>
                <li role="menuitem">
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <nav>
            <Link to="/login" className="btn btn-outline-primary me-2">
              Log in
            </Link>
            <Link to="/register" className="btn btn-primary">
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
