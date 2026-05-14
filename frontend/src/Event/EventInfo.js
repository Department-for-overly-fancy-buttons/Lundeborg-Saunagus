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
    eventData = await fetchEvents();
    console.log(eventData);
}

async function fetchEvents() {
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