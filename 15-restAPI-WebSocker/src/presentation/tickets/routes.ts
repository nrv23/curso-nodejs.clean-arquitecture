import { Router } from "express";
import { TicketController } from "./controller";
import { TicketService } from '../services/ticket.service';

export class TicketRoutes {
    static get routes() {

        const ticketService = new TicketService();
        const {
            getTickets,
            getLastTicketNumber,
            pendingTickets,
            drawTicket,
            ticketDone,
            workingOn,
            creareTicket,
        } = new TicketController(ticketService);
        const router = Router();

        router.get("/", getTickets);
        router.get("/last", getLastTicketNumber);
        router.get("/pending", pendingTickets);
        router.post("/", creareTicket);
        router.get("/draw/:desk", drawTicket);
        router.put("/done/:ticketId", ticketDone);
        router.get("/working-on", workingOn);

        return router;
    }
}
