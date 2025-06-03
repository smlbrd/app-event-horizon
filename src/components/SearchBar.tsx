import { useEffect, useState } from 'react';
import searchIcon from '../assets/icons8-search.svg';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value?: string) => void;
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      className="w-100"
      role="search"
      onSubmit={handleSubmit}
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
          onChange={handleInputChange}
          autoComplete="off"
          aria-label="Search events"
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
