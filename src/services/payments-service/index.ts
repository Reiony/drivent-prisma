import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPaymentByTicketId(userId: number, ticketId: number) {
    await verifyAllCamps(ticketId, userId);

    const payment = await paymentRepository.findPaymentByTicketId(ticketId);

    if (!payment) {
        throw notFoundError();
    }
    return payment;
}

async function verifyAllCamps(ticketId: number, userId: number) {
    const ticket = await ticketsRepository.findTicketById(ticketId);

    if (!ticket) {
        throw notFoundError();
    }
    const enrollment = await ticketsRepository.findEnrollmentById(ticket.enrollmentId);

    if (enrollment.userId !== userId) {
        throw unauthorizedError();
    }

}

async function postPayment(ticketId: number, userId: number, cardData: CardType) {
    await verifyAllCamps(ticketId, userId);

    const ticket = await ticketsRepository.findTicketTypeById(ticketId);

    const paymentData = {
        ticketId,
        value: ticket.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4),
    };

    const payment = await paymentRepository.createPayment(ticketId, paymentData);

    if(!payment) {
        throw notFoundError();
    }

    await ticketsRepository.ticketUpdate(ticketId);

    return payment;
}

export type CardType = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

const paymentService = {
    getPaymentByTicketId,
    postPayment
};

export default paymentService;