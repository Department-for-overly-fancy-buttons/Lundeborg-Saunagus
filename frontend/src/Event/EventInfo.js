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
    let eventContainerEl = document.querySelector("#event-container");
    let ticketButton = document.querySelector("#getTicketButton");
    ticketButton.setAttribute("data-eventId", eventData.id);
    ticketButton.addEventListener("click", handleGetTicket);

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

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let eventStartDate = Temporal.PlainDateTime.from(eventData.date);
    let eventStartTime = Temporal.PlainTime.from(eventData.startTime);
    let startHour = String(eventStartTime.hour).padStart(2, "0");
    let startMinute = String(eventStartTime.minute).padStart(2, "0");
    let eventEndTime = Temporal.PlainTime.from(eventData.endTime);
    let endHour = String(eventEndTime.hour).padStart(2, "0");
    let endMinute = String(eventEndTime.minute).padStart(2, "0");
    let dateTimeElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "dateTime-info",
            htmlAttributes: {
                textContent: "Dato: " + eventStartDate.day + ". " + monthNames[eventStartDate.month - 1] + "\n" + startHour + ":" + startMinute + " Til " + endHour + ":" + endMinute,
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
    eventContainerEl.appendChild(eventBox);
    console.log(eventData);
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