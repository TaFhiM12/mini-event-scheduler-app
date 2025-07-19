import { useState, useEffect } from 'react';
import { getEvents } from './api/eventService';
import EventForm from './componets/EventForm';
import CategoryFilter from './componets/CategoryFilter';
import EventList from './componets/EventList';
import type { Event } from './types/event';

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setError('');
    } catch (err) {
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  const activeEvents = filteredEvents.filter(event => !event.archived);
  const archivedEvents = filteredEvents.filter(event => event.archived);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Event Scheduler</h1>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <EventForm onEventCreated={fetchEvents} />

        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {loading ? (
          <div className="text-center py-8">Loading events...</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <EventList
              events={activeEvents} 
              onEventUpdated={fetchEvents} 
            />

            {archivedEvents.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-semibold mb-4">Archived Events</h2>
                <EventList 
                  events={archivedEvents} 
                  onEventUpdated={fetchEvents} 
                  showArchived={true}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}