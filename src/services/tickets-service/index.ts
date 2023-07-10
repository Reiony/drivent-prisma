import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { TicketStatus } from '@prisma/client';

async function getTicketsType(){
  const ticketsType= await ticketsRepository.findTicketsType();
  if(!ticketsType){
    throw notFoundError();
  }
  return ticketsType;
}

async function getTicket(userId: number) {
  const checkEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!checkEnrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findUserTicket(checkEnrollment.id);
  if(!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function postTicket(ticketTypeId: number, userId: number) {
  const checkEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!checkEnrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: checkEnrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketsRepository.createTicket(ticketData);  

  const ticket = await ticketsRepository.findUserTicket(checkEnrollment.id);

  return ticket;
}

const ticketService = {
    getTicketsType,
    getTicket,
    postTicket
};

export default ticketService;
