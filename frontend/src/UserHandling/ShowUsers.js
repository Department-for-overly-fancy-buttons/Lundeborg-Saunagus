import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users";

let userData = [];

async function initApp() {
    displayNavigationBar();
    userData = await fetchUsers();
    console.log(userData);
}

async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}`)
        if (!response.ok) {
            throw new Error("HTTP error!");
        }
        return await response.json();
    } catch (error) {
        console.log("An error occurred:   " + error)
    }
}