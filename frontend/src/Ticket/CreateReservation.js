import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/tickets";
const EVENT_URL = "/api/events"

const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");
let eventData;

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    eventData = await fetchEvent();
    console.log(eventData);
    document.getElementById("reserveTicketButton").addEventListener("click", handleSubmit);
}

async function fetchEvent() {
    try {
        const response = await fetch(`${EVENT_URL}/${eventId}`);
        console.log(response);
        if (!response.ok) {
            throw new Error("HTTP error!");
        }
        return await response.json();

    } catch (error) {
        console.log("An error occurred:   " + error)
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const formData = new FormData(formEl);

    const eventRequest = {
        email: formData.get("ticketEmail"),
        eventId: eventData.id
    }
    console.log(eventRequest);
    const response = await fetch(`${BASE_URL}/ticket`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken()},
        body: JSON.stringify(eventRequest)
    });

    const result = await response.json();
    console.log("Event added:", result);
}

//todo - move code for setting paid status
// async function handleSubmit(event) {
//     event.preventDefault();
//     const formEl = event.target.closest("form");
//     const formData = new FormData(formEl);
//     const eventRequest = {
//         email: formData.get("ticketEmail"),
//         eventId: eventData.id
//     }
//     console.log(eventRequest);
//     const response = await fetch(`${BASE_URL}/paid/status`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken()},
//         body: JSON.stringify(eventRequest)
//     });
//     const result = await response.json();
//     console.log("Event added:", result);
// }