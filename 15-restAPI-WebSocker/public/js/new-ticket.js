
const currentTicketLabel = document.querySelector("span");
const createTicketBtn = document.querySelector("button");

async function getLastTicket() {

    const response = await fetch("/api/ticket/last");
    const lastTicket = await response.json();
    currentTicketLabel.innerHTML = lastTicket.number;
}

async function createTicket() {

    const response = await fetch("/api/ticket", {
        method: "POST"
    });
    const newTicket = await response.json();

    currentTicketLabel.innerHTML = newTicket.ticket.number;
}

createTicketBtn.addEventListener("click", createTicket);

getLastTicket();