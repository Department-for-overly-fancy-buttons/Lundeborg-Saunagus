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

function display(){
    console.log(ticketData);
}