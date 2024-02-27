
export interface ITicket {

    id: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string; // el escritorio a donde se asgina
    handleAt?: Date; // en cual momento el ticket fu asignado
    done: boolean;
}