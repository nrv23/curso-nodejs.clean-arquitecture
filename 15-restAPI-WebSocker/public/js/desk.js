
const lblPending = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("escritorio es requerido");
}

const deskNumber = searchParams.get("escritorio");
deskHeader.innerText = deskNumber;

function checkTicketCount(currentCount = 0) {
    if (currentCount === 0) {
        noMoreAlert.classList.remove("d-none");
    } else {
        noMoreAlert.classList.add("d-none");
    }

    lblPending.innerHTML = currentCount;
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


loadingInitialCount();
connectToWebSockets();
