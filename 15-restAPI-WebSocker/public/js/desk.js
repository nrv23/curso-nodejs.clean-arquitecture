
const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");
const currentTicketLbl = document.querySelector("small");
const btnDraw = document.querySelector("#btn-draw");
const btnDone = document.querySelector("#btn-done");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("escritorio es requerido");
}

const deskNumber = searchParams.get("escritorio");
let workingTicket = null;
deskHeader.innerText = deskNumber;

function checkTicketCount(currentCount = 0) {
    if (currentCount === 0) {
        noMoreAlert.classList.remove("d-none");
    } else {
        noMoreAlert.classList.add("d-none");
    }

    lblPending.innerHTML = currentCount;
}

async function getTicket() {

    await finishTicket();

    const response = await fetch('/api/ticket/draw/' + deskNumber);
    const { status, ticket, message = null } = await response.json();
    console.log({ status, ticket, message })
    if (status === "error") {
        currentTicketLbl.innerHTML = message;
        return;
    }

    workingTicket = ticket;
    currentTicketLbl.innerHTML = ticket.number;
}

async function finishTicket() {

    if (!workingTicket) return;

    const response = await fetch(`/api/ticket/done/${workingTicket.id}`, {
        method: "PUT"
    });
    const { status, message } = await response.json();

    if (status === "ok") {
        workingTicket = null;
        currentTicketLbl.innerHTML = 'Nadie';
    } else {
        currentTicketLbl.innerHTML = message;

    }
}

async function loadingInitialCount() {

    const response = await fetch("/api/ticket/pending");
    const { tickets } = await response.json();
    checkTicketCount(tickets.length || 0);
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data);

        if (type === "on-ticket-count-changed") {
            checkTicketCount(payload);
        }
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}

btnDraw.addEventListener("click", e => {

    getTicket();
})
btnDone.addEventListener("click", finishTicket);

loadingInitialCount();
connectToWebSockets();
