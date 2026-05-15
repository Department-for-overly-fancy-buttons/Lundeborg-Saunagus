import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/events";

const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");
let eventData;

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    eventData = await fetchEvent();
    display();
    console.log(eventData);
}

async function fetchEvent() {
    try {
        const response = await fetch(`${BASE_URL}/${eventId}`);
        console.log(response);
        if (!response.ok) {
            throw new Error("HTTP error!");
        }
        return await response.json();

    } catch (error) {
        console.log("An error occurred:   " + error)
    }
}

function display() {
    let ticketButton = document.querySelector("#getTicketButton");
    ticketButton.setAttribute("data-eventId", eventData.id);
    ticketButton.addEventListener("click", handleGetTicket);
}

async function handleGetTicket(event) {
    event.preventDefault();

    const ticketButton = event.target.closest("button");
    const eventId = ticketButton.getAttribute("data-eventId");
    if (eventId !== null) {
        window.location.href = `/Ticket/CreateReservation.html?eventId=${eventId}`;
    } else {
        //console.log("box clicked");
    }
}