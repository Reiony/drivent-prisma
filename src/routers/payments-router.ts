import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, postPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", postPayment);

export { paymentsRouter };
