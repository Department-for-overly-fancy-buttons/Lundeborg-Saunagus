import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/events";
const TICKET_URL = "/api/tickets";


const params = new URLSearchParams(window.location.search);
const eventId = params.get("eventId");
let eventData;

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    eventData = await fetchEvent();
    display();
    document.getElementById("reserveTicketButton").addEventListener("click", handleGetTicket);
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
    let eventContainerEl = document.querySelector("#event-container");
    let eventBox = createHtmlElement({tagName: "div", htmlClass: "event-box"})
    eventBox.setAttribute("data-eventId", eventData.id);

    let titleElement = createHtmlElement({
        tagName: "h4",
        htmlClass: "event-title",
        htmlAttributes: {
            textContent: eventData.title,
            title: eventData.title
        }
    });
    eventBox.appendChild(titleElement);

    if (eventData.information) {
        let infoElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "event-info",
            htmlAttributes: {
                textContent: "Info: " + eventData.information,
                title: eventData.information
            }
        });
        eventBox.appendChild(infoElement);
    }

    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];
    let eventStartDate = new Date(Date.parse(eventData.date + "T" + eventData.startTime));
    let startHour = String(eventStartDate.getHours()).padStart(2, "0");
    let startMinute = String(eventStartDate.getMinutes()).padStart(2, "0");
    let eventEndTime = new Date(Date.parse(eventData.date + "T" + eventData.endTime));
    let endHour = String(eventEndTime.getHours()).padStart(2, "0");
    let endMinute = String(eventEndTime.getMinutes()).padStart(2, "0");
    let dateTimeElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "dateTime-info",
            htmlAttributes: {
                textContent: "Dato: " + eventStartDate.getDate() + ". " + monthNames[eventStartDate.getMonth()] + "\n" + startHour + ":" + startMinute + " Til " + endHour + ":" + endMinute,
                title: "date"
            }
        }
    );
    dateTimeElement.setAttribute('style', 'white-space: pre;');
    eventBox.appendChild(dateTimeElement);

    let capacityEl = createHtmlElement({
            tagName: "h5",
            htmlClass: "dateTime-info",
            htmlAttributes: {
                textContent: "Antal pladser: " + eventData.capacity + "\nPladser tilbage: " + eventData.ticketsLeft,
                title: "date"
            }
        }
    );
    capacityEl.setAttribute('style', 'white-space: pre;');
    eventBox.appendChild(capacityEl);

    let saunaMasterEl = createHtmlElement({
            tagName: "h5",
            htmlClass: "dateTime-info",
            htmlAttributes: {
                textContent: "Fyrmester: " + eventData.gusUserResponse.firstname + " " + eventData.gusUserResponse.lastname,
                title: "date"
            }
        }
    );
    eventBox.appendChild(saunaMasterEl);

    if (isAdmin()) {
        let viewParticipants = createHtmlElement({
            tagName: "button",
            htmlClass: "participant-button",
            htmlAttributes: {textContent: "Se deltager-info"}
        })
        viewParticipants.addEventListener("click", handleGetParticipantInfo);
        eventBox.appendChild(viewParticipants);
    }

    eventContainerEl.appendChild(eventBox);
    console.log(eventData);
}


async function handleGetParticipantInfo(event) {
    event.preventDefault();
    if (eventId !== null) {
        window.location.href = `/ticket/ticketsForEvent.html?eventId=${eventId}`;
    } else {
        console.log("box clicked");
    }
}

async function handleGetTicket(event) {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const formData = new FormData(formEl);

    const eventRequest = {
        email: formData.get("ticketEmail"),
        eventId: eventData.id
    }
    console.log(eventRequest);
    const response = await fetch(`${TICKET_URL}/ticket`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken()},
        body: JSON.stringify(eventRequest)
    });

    const result = await response.json();
    console.log("Event added:", result);
}