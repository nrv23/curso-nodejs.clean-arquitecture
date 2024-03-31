import { ITicket } from '../../domain/interfaces/ticket.interface';
import { UuidAdapter } from '../../config/uuid.adapter';
import { WssService } from './wss.service';


export class TicketService {


    public tickets: ITicket[] = [];

    constructor(
        private readonly socket = WssService.instance
    ) {

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
        this.onTicketNumberCHanged();
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
        this.onTicketNumberCHanged();
        this.onWorkingOnChanged();

        return { ticket, status: "ok" };

    }


    public onFinishedTicket(ticketId: string) {
        const ticket = this.tickets.find(t => t.id === ticketId);

        if (!ticket) return { status: "error", message: "There is not ticket with this id" };

        this.tickets = this.tickets.map(t => {
            if (t.id === ticketId) t.done = true;

            return t;
        });

        return {
            status: "ok"
        };
    }


    private onTicketNumberCHanged() {
        console.log(this.getPendingTickets.length);
        this.socket.sendMessage("on-ticket-count-changed", this.getPendingTickets().length);
    }

    //-- --------------------------------------------------

    private onWorkingOnChanged() {
        this.socket.sendMessage("on-working-changed", this.listWorkingOnTickets);
    }

}