import { ITicket } from '../../domain/interfaces/ticket.interface';
import { UuidAdapter } from '../../config/uuid.adapter';


export class TicketService {


    public readonly tickets: ITicket[] = [];

    constructor() {

    }

    private workingOnTickets: ITicket[] = [];


    public get listWorkingOnTickets() {

        return this.workingOnTickets.slice(0, 4);
    }

    public createTicket() {

        const ticket: ITicket = {
            id: UuidAdapter.getId(),
            number: this.lastTicketNumber! + 1,
            createdAt: new Date(),
            done: false
        }

        this.tickets.push(ticket);

        // conectar con ws

        return ticket;
    }


    public getPendingTickets(): ITicket[] {

        return this.tickets.filter(ticket => !ticket.done && !ticket.handleAtDesk);
    }

    public get lastTicketNumber() {

        return this.tickets.length > 0
            ? this.tickets.at(-1)?.number
            : 0;
    }

    public drawTicket(desk: string) {

        const ticket = this.tickets.find(t => !t.handleAtDesk)

        if (!ticket) return { status: "error", message: "There is not pending tickets" };

        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({ ...ticket });

        // notificar al ws que el ticket se esta trabajando

        return { ticket, status: "ok" };

    }


    public onFinishedTicket(ticketId: string) {
        const ticket = this.tickets.find(t => t.id === ticketId);

        if (!ticket) return { status: "error", message: "There is not ticket with this id" };

        this.tickets.map(t => {
            if (t.id === ticketId) t.done = true;

            return t;
        });

        return {
            status: "ok"
        };
    }

}