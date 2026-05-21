import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");

const BASE_URL = "/api/tickets";

let ticketData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    if(isAdmin()) {
        displayAdminNavigationBar();
    }
    ticketData = await fetchTickets();
    display();
}

async function fetchTickets() {
    try {
        const response = await fetch(`${BASE_URL}/event/${eventId}`);
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
    for (let i = 0; i < ticketData.length; i++) {
        let ticketBox = createHtmlElement({tagName: "div", htmlClass: "ticket-box"})
        ticketBox.setAttribute("data-ticketId", ticketData[i].id);


        let ticketElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "ticket-info",
            htmlAttributes: {
                textContent: "Bruger: " + ticketData[i].email + "\nBetalt: " + ticketData[i].paid + "\nPris: " + ticketData[i].price + " kr.\nBegivenhed: " + ticketData[i].eventTitle + "\nDato: " + ticketData[i].date,
                title: "ticket"
            }
        });
        ticketElement.setAttribute('style', 'white-space: pre;');
        ticketBox.appendChild(ticketElement);
        ticketBox.addEventListener("click", handleGetTicket);
        if(!ticketData[i].paid){
            console.log("hi");
            ticketBox.setAttribute('style', 'background-color :pink');
        }
        ticketContainerEl.appendChild(ticketBox);
        console.log(ticketData[i]);
    }
}

async function handleGetTicket(event) {
    event.preventDefault();

    const ticketBox = event.target.closest("div");
    const ticketId = ticketBox.getAttribute("data-ticketId");
    if (ticketId !== null) {
        window.location.href = `/ticket/ShowTicket.html?ticketId=${ticketId}`;
    } else {
        console.log("box clicked");
    }
}