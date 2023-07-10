import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
    try {
        const ticketTypes = await ticketService.getTicketsType();
        return res.status(httpStatus.OK).send(ticketTypes)
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    try {
        const ticket = await ticketService.getTicket(userId);
        return res.status(httpStatus.OK).send(ticket)
    } catch (err) {
        if(err.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(err)
        }
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const {ticketTypeId} = req.body;
    
    try{
        const ticket = await ticketService.postTicket(ticketTypeId, userId);
        return res.status(httpStatus.CREATED).send(ticket)
    } catch (err) {
        if(err.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(err)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}