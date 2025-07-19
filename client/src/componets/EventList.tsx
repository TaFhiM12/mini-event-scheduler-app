import { archiveEvent, deleteEvent } from '../api/eventService';
import type { Event } from '../types/event';

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
      default: return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div>
      {events.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new event.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className={`p-5 rounded-lg border ${event.archived ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'} shadow-xs hover:shadow-sm transition-shadow duration-150`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(`${event.date}T${event.time}`).toLocaleString([], {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              
              {event.notes && (
                <div className="mt-3">
                  <p className="text-sm text-gray-700">{event.notes}</p>
                </div>
              )}

              <div className="mt-4 flex space-x-3">
                {!event.archived && (
                  <button
                    onClick={() => handleArchive(event.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Archive
                  </button>
                )}
                <button
                  onClick={() => handleDelete(event.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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