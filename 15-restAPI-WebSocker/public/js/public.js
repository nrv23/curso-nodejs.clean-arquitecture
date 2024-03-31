function renderTickets(tickets = []) {

    for (let i = 0; i < tickets.length; i++) {

        if (i >= 4) break;
        const ticket = tickets[i];
        if (!ticket) continue;
        const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
        const lblDeskTicket = document.querySelector(`#lbl-desk-0${i + 1}`);

        lblTicket.innerHTML = `Ticket ${ticket.number}`;
        lblDeskTicket.innerHTML = ticket.handleAtDesk;

    }
}


async function loadCurrentTickets() {

    const response = await fetch("/api/ticket/working-on");
    const { tickets } = await response.json();
    renderTickets(tickets);
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data);
        console.log(payload);
        if (type === "on-working-changed") {
            renderTickets(payload)
        }
    };

    socket.onclose = (event) => {
        setTimeout(() => {
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}


loadCurrentTickets();
connectToWebSockets();