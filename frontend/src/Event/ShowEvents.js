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
        eventBox.setAttribute("data-eventID", eventData[i].id);

        let titleElement = createHtmlElement({
            tagName: "h4",
            htmlClass: "event-title",
            htmlAttributes: {
                textContent: eventData[i].title,
                title: eventData[i].title
            }
        });
        eventBox.appendChild(titleElement);

        if(eventData[i].information) {
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
        eventContainerEl.appendChild(eventBox);
        console.log(eventData[i]);
    }
}