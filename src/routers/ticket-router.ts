import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicket, getTicketType, postTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketType)
  .get("", getTicket)
  .post("", postTicket);

export { ticketsRouter };
