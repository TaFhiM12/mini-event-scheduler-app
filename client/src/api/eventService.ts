import type { Event } from "../types/event";
const API_URL = '/api/events';

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (event: Omit<Event, 'id' | 'category' | 'archived'>): Promise<Event> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const archiveEvent = async (id: string): Promise<Event> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error('Failed to archive event');
  }
  return response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};