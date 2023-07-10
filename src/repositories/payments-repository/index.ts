import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentByTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId,
        }
    });
}

async function createPayment(ticketId: number, params: PaymentType) {
    return prisma.payment.create({
        data: {
            ticketId,
            ...params,
        }
    });
}

export type PaymentType = Omit<Payment, "id" | "createdAt" | "updatedAt">

const paymentRepository = {
    findPaymentByTicketId,
    createPayment,
};

export default paymentRepository;