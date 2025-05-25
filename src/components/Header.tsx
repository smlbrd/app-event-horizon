import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventHorizonLogo from '../assets/icons8-sun.svg';
import userIcon from '../assets/user-icon.png';
import menuIcon from '../assets/icons8-menu.svg';
import SearchBar from './SearchBar';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearch: (value?: string) => void;
}

const isLoggedIn = false;

const Header = ({ searchValue, onSearchChange, onSearch }: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setDropdownOpen((open) => !open);
  };

  return (
    <header
      className="border-bottom"
      style={{
        height: '72px',
        minHeight: '72px',
        padding: '0 1rem',
        background: '#fff',
      }}
    >
      <div
        className="d-flex align-items-center h-100"
        style={{ height: '100%' }}
      >
        <Link
          to="/"
          tabIndex={0}
          className="me-3 d-flex align-items-center text-decoration-none"
          style={{ height: '70%' }}
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
            className="fs-4 fw-bold ms-2 text-dark d-none d-md-inline"
            style={{ lineHeight: 1 }}
          >
            event horizon
          </span>
        </Link>

        <div
          className="flex-grow-1 d-flex align-items-center justify-content-center w-30"
          style={{ height: '100%' }}
        >
          <div style={{ maxWidth: 350, width: '100%' }}>
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearch}
            />
          </div>
        </div>

        <div
          className="d-flex align-items-center"
          style={{
            minWidth: 180,
            justifyContent: 'flex-end',
            height: '100%',
          }}
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
            <>
              <nav className="d-none d-md-flex">
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Log in
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign up
                </Link>
              </nav>
              <div className="d-md-none position-relative">
                <img
                  src={menuIcon}
                  alt="Open menu"
                  style={{ height: 32, width: 32, cursor: 'pointer' }}
                  onClick={() => setDropdownOpen((open) => !open)}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="Open authentication menu"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setDropdownOpen((open) => !open);
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
                        to="/login"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Log in
                      </Link>
                    </li>
                    <li role="menuitem">
                      <Link
                        to="/register"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Sign up
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
