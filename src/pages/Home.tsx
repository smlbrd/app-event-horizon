import { useState } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const handleSearch = (value?: string) => setSearch(value ?? searchInput);

  return (
    <>
      <Header
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
      />
      <main id="main-content" tabIndex={-1} className="py-5">
        <EventList search={search} />
      </main>
    </>
  );
};

export default Home;
