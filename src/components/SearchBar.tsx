import type { ChangeEvent } from 'react';
import searchIcon from '../assets/icons8-search.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <form
      className="w-100"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      style={{ marginBottom: 0 }}
    >
      <div className="search-bar">
        <label htmlFor="event-search" className="visually-hidden">
          Search events
        </label>
        <input
          id="event-search"
          type="search"
          className="form-control"
          style={{ height: 40 }}
          placeholder={'Search events'}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          autoComplete="off"
        />
        <button
          type="submit"
          className="search-bar-button btn-orange"
          style={{
            height: 40,
            width: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Search"
        >
          <img src={searchIcon} alt="" width={16} height={16} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
