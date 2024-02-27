import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';


export class TicketController {

    constructor(
        private readonly ticketService: TicketService
    ) { }


    public getTickets = async (req: Request, res: Response) => {

        res.json({
            tickets: this.ticketService.tickets
        });
    }

    public getLastTicketNumber = async (req: Request, res: Response) => {

        res.json({
            number: this.ticketService.lastTicketNumber
        });
    }

    public pendingTickets = async (req: Request, res: Response) => {
        res.json({
            tickets: this.ticketService.getPendingTickets()
        });
    }

    public drawTicket = async (req: Request, res: Response) => {

        const { desk } = req.params;

        res.json({
            ticket: this.ticketService.drawTicket(desk)
        });
    }

    public ticketDone = async (req: Request, res: Response) => {

        const { ticketId } = req.params;

        res.json({
            ticket: this.ticketService.onFinishedTicket(ticketId)
        });
    }

    public workingOn = async (req: Request, res: Response) => {
        res.json({
            tickets: this.ticketService.listWorkingOnTickets
        });
    }

    public creareTicket = async (req: Request, res: Response) => {
        res.status(201).json({
            ticket: this.ticketService.createTicket()
        });
    }
}


