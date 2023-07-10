import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    console.log(userId)
    try {
        const ticketId = req.query.ticketId;

        if (!ticketId) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }
        const payment = await paymentService.getPaymentByTicketId(userId, Number(ticketId));

        if (!payment) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId, cardData } = req.body;
    try {

        if (!ticketId || !cardData) {
            return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        const payment = await paymentService.postPayment(ticketId, userId, cardData);

        return res.status(httpStatus.OK).send(payment);
    } catch (error) {
        if (error.name === "UnauthorizedError") {
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}