import { Router } from 'express';
import { contactController } from '../controllers/contact.controller.js';
import { contactRateLimiter } from '../middleware/rateLimit.js';

export const contactRoute = Router();

contactRoute.post('/', contactRateLimiter, contactController);
