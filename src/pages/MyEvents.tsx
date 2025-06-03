import { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import EventList from '../components/EventList';
import { fetchEventsForUser, fetchAttendeesByEventId } from '../api/api';
import { UserContext } from '../contexts/UserContext';
import type { Event } from '../types/event.types';
import type { Attendee } from '../types/attendee.types';

const MyEvents = () => {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [notGoingEvents, setNotGoingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(UserContext);
  const user = context?.user;

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchEventsForUser(user.id)
      .then(async (events) => {
        const eventStatuses = await Promise.all(
          events.map(async (event) => {
            const attendees = await fetchAttendeesByEventId(event.id);
            const myAttendee = attendees.find(
              (a: Attendee) => a.user_id === user.id
            );
            return { event, status: myAttendee?.status };
          })
        );
        setAttendingEvents(
          eventStatuses
            .filter((e) => e.status === 'attending')
            .map((e) => e.event)
        );
        setNotGoingEvents(
          eventStatuses
            .filter((e) => e.status === 'cancelled')
            .map((e) => e.event)
        );
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-4">Please log in to view your events.</div>
    );
  }

  const handleSearch = (value?: string) => setSearch(value ?? searchInput);

  return (
    <>
      <Header
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
      />
      <main id="main-content" tabIndex={-1} className="mt-4 py-5">
        <div className="container">
          <h2>Attending</h2>
          <EventList
            search={search}
            events={attendingEvents}
            loading={loading}
          />
        </div>
        <div className="container">
          <h2 className="mt-2">Not Going</h2>
          <EventList
            search={search}
            events={notGoingEvents}
            loading={loading}
          />
        </div>
      </main>
    </>
  );
};

export default MyEvents;
