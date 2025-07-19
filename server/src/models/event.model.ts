interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    notes?: string;
    category: 'Work' | 'Personal' | 'Other';
    archived: boolean;
}

let events: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: '2023-10-15',
    time: '14:00',
    notes: 'Discuss project timeline',
    category: 'Work',
    archived: false
  },
  {
    id: '2',
    title: 'Family Dinner',
    date: '2023-10-16',
    time: '19:30',
    notes: 'Birthday celebration',
    category: 'Personal',
    archived: false
  },
  {
    id: '3',
    title: 'Gym Session',
    date: '2023-10-17',
    time: '07:00',
    category: 'Other',
    archived: true
  }
];

export const createEvent = ( eventData: Omit<Event , 'id' | 'category' | 'archived'>): Event => {
    const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
        category: categorizeEvent(eventData.title , eventData.notes),
        archived: false
    };
    events.push(newEvent);
    return newEvent;
}

export const getAllEvents = (): Event[] => {
    const sortedEvents = [...events].sort( ( a , b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });
    return sortedEvents;
}

export const archiveEvent = ( id: string ): Event | null =>{
    const event = events.find( e => e.id === id);
    if(!event) return null;
    event.archived =  true ;
    return event;
}

export const deleteEvent = ( id: string ): boolean => {
    const initialLength = events.length;
    events = events.filter ( e => e.id !== id );
    return events.length !== initialLength;
}

function categorizeEvent(title: string, notes: string = ''): 'Work' | 'Personal' | 'Other' {
  const workKeywords = ['meeting', 'project', 'client', 'work', 'office'];
  const personalKeywords = ['birthday', 'family', 'friend', 'personal', 'holiday'];
  
  const text = `${title} ${notes}`.toLowerCase();
  
  if (workKeywords.some(keyword => text.includes(keyword))) {
    return 'Work';
  }
  
  if (personalKeywords.some(keyword => text.includes(keyword))) {
    return 'Personal';
  }
  
  return 'Other';
}