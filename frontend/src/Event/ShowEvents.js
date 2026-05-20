import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/events";

let eventData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    eventData = await fetchEvents();
    display();
}

async function fetchEvents() {
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
    let eventContainerEl = document.querySelector("#event-container");
    for (let i = 0; i < eventData.length; i++) {
        let eventBox = createHtmlElement({tagName: "div", htmlClass: "event-box"})
        eventBox.setAttribute("data-eventId", eventData[i].id);

        let titleElement = createHtmlElement({
            tagName: "h4",
            htmlClass: "event-title",
            htmlAttributes: {
                textContent: eventData[i].title,
                title: eventData[i].title
            }
        });
        eventBox.appendChild(titleElement);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        console.log(eventData[i].date)
        let eventStartDate = new Date(Date.parse(eventData[i].date + "T" + eventData[i].startTime));
        let startHour = String(eventStartDate.getHours()).padStart(2, "0");
        let startMinute = String(eventStartDate.getMinutes()).padStart(2, "0");
        let eventEndTime = new Date(Date.parse(eventData[i].date + "T" + eventData[i].endTime));
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

        if (eventData[i].information) {
            let infoElement = createHtmlElement({
                tagName: "h5",
                htmlClass: "event-info",
                htmlAttributes: {
                    textContent: "Info: " + eventData[i].information,
                    title: eventData[i].information
                }
            });
            eventBox.appendChild(infoElement);
        }

        eventBox.addEventListener("click", handleGetEvent);
        eventContainerEl.appendChild(eventBox);
        console.log(eventData[i]);
    }
}

async function handleGetEvent(event) {
    event.preventDefault();

    const eventBox = event.target.closest("div");
    const eventId = eventBox.getAttribute("data-eventId");
    if (eventId !== null) {
        window.location.href = `/Event/EventInfo.html?eventId=${eventId}`;
    } else {
        console.log("box clicked");
    }
}