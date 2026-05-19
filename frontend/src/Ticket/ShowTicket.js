import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const params = new URLSearchParams(window.location.search);
const ticketId = params.get("ticketId");

const BASE_URL = "/api/tickets";

let ticketData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    ticketData = await fetchTicket();
    display();
}

async function fetchTicket() {
    try {
        const response = await fetch(`${BASE_URL}/get/${ticketId}`);
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
    let ticketContainerEl = document.querySelector("#ticket-container");

    let ticketBox = createHtmlElement({tagName: "div", htmlClass: "ticket-box"})


    let ticketElement = createHtmlElement({
        tagName: "h5",
        htmlClass: "ticket-info",
        htmlAttributes: {
            textContent: "Bruger: " + ticketData.email + "\nBetalt: " + ticketData.paid + "\nPris: " + ticketData.price +  " kr.\nEvent: " + ticketData.eventTitle + "\nDato: " + ticketData.date,
            title: "ticket"
        }
    });
    ticketElement.setAttribute('style', 'white-space: pre;');

    let goToEventButton = createHtmlElement({
        tagName: "button",
        htmlClass: "event-button",
        htmlAttributes: {textContent: "Gå til event"}
    })
    goToEventButton.setAttribute("data-eventId", ticketData.eventId);
    goToEventButton.addEventListener("click", handleGetEvent);
    ticketBox.appendChild(ticketElement);
    ticketBox.appendChild(goToEventButton);
    ticketContainerEl.appendChild(ticketBox);
    console.log(ticketData);
}

async function handleGetEvent(event) {
    event.preventDefault();

    const eventButton = event.target.closest("button");
    const eventId = eventButton.getAttribute("data-eventId");
    if (eventId !== null) {
        window.location.href = `/event/EventInfo.html?eventId=${eventId}`;
    } else {
        console.log("box clicked");
    }
}
