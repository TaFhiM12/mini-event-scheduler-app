import { Request , Response  } from "express";
import * as eventModel from '../models/event.model'

export const createEvent = ( req: Request , res: Response) => {
    const { title , date , time , notes } = req.body;
    try {
        const newEvent =  eventModel.createEvent( {title , date , time , notes});
        res.status(200).send(newEvent);
    } catch (error) {
        res.status(500).send({ error : "Failed to create event"});
    }
}

export const getAllEvents = (req: Request, res: Response) => {
  try {
    const events = eventModel.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export const archiveEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = eventModel.archiveEvent(id);
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.json(event);
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = eventModel.deleteEvent(id);
  
  if (!success) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.status(204).send();
};