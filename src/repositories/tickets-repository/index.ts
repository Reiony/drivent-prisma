import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function findTicketsType() {
    const tickets = await prisma.ticketType.findMany();
    return tickets;
}

async function findUserTicket(id: number) {
    const tickets = await prisma.ticket.findFirst({
        where: {
            enrollmentId: id
        },
        include: {
            TicketType: true
        }
    });
    return tickets;
}

async function findTicketById(ticketId: number) {
    const tickets = await prisma.ticket.findFirst({
        where: {
            id: ticketId
        }
    });
    return tickets;
}

async function findEnrollmentById(id: number) {
    const tickets = await prisma.enrollment.findFirst({
        where: {
            id
        }
    });
    return tickets;
}

async function createTicket(ticketData: CreateTicketParams) {
    await prisma.ticket.create({
        data: {
            ...ticketData
        }
    })

}

async function ticketUpdate(ticketId: number) {
    return prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: TicketStatus.PAID,
      }
    });
  }

async function findTicketTypeById(ticketId: number) {
    return prisma.ticket.findFirst({
        where: {
            id: ticketId,
        },
        include: {
            TicketType: true,
        }
    });

}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketsRepository = {
    findTicketsType,
    findUserTicket,
    createTicket,
    findTicketById,
    findEnrollmentById,
    findTicketTypeById,
    ticketUpdate
}

export default ticketsRepository;