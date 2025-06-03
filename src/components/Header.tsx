import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventHorizonLogo from '../assets/icons8-sun.svg';
import userIcon from '../assets/user-icon.png';
import SearchBar from './SearchBar';
import { useUser } from '../contexts/useUser';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (value?: string) => void;
}

const Header = ({ searchValue, onSearchChange, onSearch }: HeaderProps) => {
  const { user, logout } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      menuRef.current?.focus();
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  const handleLogoClick = () => {
    setDropdownOpen((open) => !open);
  };

  return (
    <header
      className="border-bottom fixed-top py-2 px-4"
      style={{ zIndex: 900, backgroundColor: '#fff' }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between flex-wrap py-2">
        <div className="d-flex align-items-center flex-shrink-0 me-2">
          <Link
            to="/"
            tabIndex={0}
            className="d-flex align-items-center text-decoration-none"
            style={{ height: 40 }}
            onClick={() => {
              onSearchChange('');
              onSearch('');
            }}
          >
            <img
              src={eventHorizonLogo}
              alt="Event Horizon Logo"
              style={{
                height: 40,
                width: 40,
                objectFit: 'contain',
                cursor: 'pointer',
              }}
            />
            <span
              className="fs-3 fw-bold ms-2 text-dark d-none d-lg-inline"
              style={{ lineHeight: 1 }}
            >
              event horizon
            </span>
            <span
              className="fs-3 fw-bold ms-2 text-dark d-none d-sm-inline d-md-none"
              style={{ lineHeight: 1 }}
            >
              event horizon
            </span>
          </Link>
        </div>

        <div className="d-none d-md-flex flex-grow-1 align-items-center justify-content-center">
          <div style={{ width: '80%' }}>
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearch}
            />
          </div>
        </div>

        <div
          className="d-flex align-items-center flex-shrink-0"
          style={{
            minWidth: 180,
            justifyContent: 'flex-end',
            height: '100%',
          }}
        >
          {user ? (
            <div ref={dropdownRef} className="position-relative">
              <img
                src={userIcon}
                alt="Open user menu"
                className="me-2 rounded-circle"
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
                  ref={menuRef}
                  className="dropdown-menu show dropdown-menu-end"
                  style={{ right: 0, left: 'auto', top: '110%' }}
                  role="menu"
                  tabIndex={-1}
                >
                  <li
                    className="dropdown-item text-muted"
                    role="presentation"
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                  >
                    Hi, {user.name}!
                  </li>
                  <li role="menuitem">
                    <Link
                      to="/create"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Create New Event
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
                      type="button"
                      className="dropdown-item text-danger"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <nav
                aria-label="User authentication"
                className="d-flex align-items-center"
              >
                <Link
                  to="/login"
                  className="text-primary me-3"
                  style={{ cursor: 'pointer' }}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-primary"
                  style={{ cursor: 'pointer' }}
                >
                  Sign up
                </Link>
              </nav>
            </>
          )}
        </div>
      </div>

      <div className="d-flex d-md-none align-items-center justify-content-center mt-2">
        <div className="w-100">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearch}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
