import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/tickets";

let ticketData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    ticketData = await fetchTickets();
    display();
}

async function fetchTickets() {
    try {
        const response = await fetch(`${BASE_URL}`);
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
                    textContent: "Bruger: " + ticketData[i].email + " betalt: " + ticketData[i].paid + " event: " + ticketData[i].eventTitle + " Dato: " + ticketData[i].date ,
                    title: "ticket"
                }
            });
            ticketBox.appendChild(ticketElement);
        ticketBox.addEventListener("click", handleGetEvent);
        ticketContainerEl.appendChild(ticketBox);
        console.log(ticketData[i]);
    }
}

async function handleGetEvent(event) {
    event.preventDefault();

    const eventBox = event.target.closest("div");
    const eventId = eventBox.getAttribute("data-ticketId");
    if (eventId !== null) {
        window.location.href = ``;
    } else {
        console.log("box clicked");
    }
}