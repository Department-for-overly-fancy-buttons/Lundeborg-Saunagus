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

function display() {
    let saunaMasterContainer = document.getElementById("eventSaunaMasterBox");
    let saunaMasterLabel = document.createElement("label");
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