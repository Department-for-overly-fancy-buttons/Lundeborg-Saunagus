import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
const BASE_URL = "/api/users";

let userData;

async function initApp() {
    displayNavigationBar();
    if(isAdmin()) {
        displayAdminNavigationBar();
    }
    userData = await fetchUsers();
    display();
}

async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`)
        if (!response.ok) {
            throw new Error("HTTP error!");
        }
        return await response.json();
    } catch (error) {
        console.log("An error occurred:   " + error)
    }
}

function display() {
    let userContainerEl = document.querySelector("#user-container");
    let userBox = createHtmlElement({tagName: "div", htmlClass: "user-box"});
    let titleElement = createHtmlElement({
        tagName: "h4",
        htmlClass: "user-title",
        htmlAttributes: {
            textContent: userData.username,
            title: userData.username
        }
    });
    userBox.appendChild(titleElement);

    let userElement = createHtmlElement({
        tagName: "h5",
        htmlClass: "user-info",
        htmlAttributes: {
            textContent: "Navn: " + userData.firstname + " " + userData.lastname + "\nFødt: " + userData.birthday +
                "\nKøn: " + userData.gender + "\nBruger type: " + userData.role + "\nTelefon: " + userData.phoneNumber +
                "\nAdresse: " + userData.address + "\nMedlemskab: " + "Aktiv"
        }
    });
    userElement.setAttribute('style', 'white-space: pre;');
    userBox.appendChild(userElement);

    let membershibLabel = document.createElement("label");
    membershibLabel.textContent = "Sæt medlemskab";
    let membershibSelect = document.createElement("select");
    membershibSelect.setAttribute("id", "Membershib");
    membershibLabel.appendChild(membershibSelect);

    let membershibData = ["Aktiv", "Venteliste", "Inaktiv", "Passiv"];

    for (let i = 0; i < membershibData.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("label", membershibData[i]);
        console.log(membershibData[i]);
        option.setAttribute("value", membershibData[i]);
        membershibSelect.appendChild(option);
    }
    userBox.appendChild(membershibLabel);

    userContainerEl.appendChild(userBox);
}
