import { Router } from 'express'
import * as eventController from '../controllers/event.controller'

const router = Router();

router.post('/events' , eventController.createEvent);
router.post('/events' , eventController.getAllEvents);
router.put('/events/:id' , eventController.archiveEvent);
router.delete('/events/:id' , eventController.deleteEvent);

export default router