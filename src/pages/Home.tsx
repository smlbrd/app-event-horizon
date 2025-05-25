import { useState } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = (value?: string) => setSearch(value ?? searchInput);

  return (
    <main id="main-content" tabIndex={-1}>
      <Header
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
      />
      <EventList search={search} />
    </main>
  );
};

export default Home;
