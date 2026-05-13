import {displayNavigationBar} from "../navigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/events";
const USER_URL = "/api/users";

let saunaMasterData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    saunaMasterData = await fetchSaunaMasters();
    display();
    document.getElementById("createEventButton").addEventListener("click", handleSubmit);
}

async function fetchSaunaMasters() {
    try {
        const response = await fetch(`${USER_URL}/employees`);
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
    const saunaMaster = getSaunaMaster();

    const eventRequest = {
        date: formData.get("eventDate"),
        startTime: formData.get("eventStartTime"),
        endTime: formData.get("eventEndTime"),
        saunaMasterEmail: saunaMaster,
        address: formData.get("eventLocation"),
        capacity: formData.get("eventCapacity")
    }
    console.log(eventRequest);
    const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken()},
        body: JSON.stringify(eventRequest)
    });

    const result = await response.json();
    console.log("Event added:", result);
}

function getSaunaMaster() {
    const saunaMaster = document.getElementById("eventSaunaMaster");
    return saunaMaster.options[saunaMaster.selectedIndex].value
}

function display() {
    let saunaMasterContainer = document.getElementById("eventSaunaMasterBox");
    let saunaMasterLabel = document.createElement("label");
    saunaMasterLabel.textContent="Fyrmester";
    let saunaMasterSelect = document.createElement("select");
    saunaMasterSelect.setAttribute("id", "eventSaunaMaster");
    saunaMasterLabel.appendChild(saunaMasterSelect);

    for (let i = 0; i < saunaMasterData.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("label", `${saunaMasterData[i].firstname} ${saunaMasterData[i].lastname}`);
        console.log(saunaMasterData[i]);
        option.setAttribute("value", saunaMasterData[i].username);
        saunaMasterSelect.appendChild(option);
    }
    saunaMasterContainer.appendChild(saunaMasterLabel);
}