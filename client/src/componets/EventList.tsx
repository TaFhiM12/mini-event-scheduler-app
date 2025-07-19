import { Event } from '../types/event';
import { archiveEvent, deleteEvent } from '../api/eventService';

interface EventListProps {
  events: Event[];
  onEventUpdated: () => void;
  showArchived?: boolean;
}

export default function EventList({ events, onEventUpdated, showArchived = false }: EventListProps) {
  const handleArchive = async (id: string) => {
    try {
      await archiveEvent(id);
      onEventUpdated();
    } catch (err) {
      alert('Failed to archive event');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      onEventUpdated();
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-800';
      case 'Personal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className={`p-4 border rounded-lg shadow-sm ${event.archived ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {new Date(`${event.date}T${event.time}`).toLocaleString()}
              </p>
              {event.notes && <p className="text-gray-700 mb-4">{event.notes}</p>}
              <div className="flex space-x-2">
                {!event.archived && (
                  <button
                    onClick={() => handleArchive(event.id)}
                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                  >
                    Archive
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}