import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import SkipToContent from '../components/SkipToContent';

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchParam = params.get('search') || '';

  const [searchInput, setSearchInput] = useState(searchParam);
  const [search, setSearch] = useState(searchParam);

  const handleSearch = (value?: string) => setSearch(value ?? searchInput);

  useEffect(() => {
    setSearchInput(searchParam);
    setSearch(searchParam);
  }, [searchParam]);

  return (
    <>
      <SkipToContent />
      <Header
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
      />
      <main id="main-content" tabIndex={-1} className="py-5">
        <EventList search={search} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
