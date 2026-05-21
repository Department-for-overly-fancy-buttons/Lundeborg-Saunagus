import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users";

let userData = [];

async function initApp() {
    displayNavigationBar();
    if (isAdmin()) {
        displayAdminNavigationBar();
    }
    userData = await fetchUsers();
    display();
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

function display() {
    let userContainerEl = document.querySelector("#user-container");
    for (let i = 0; i < userData.length; i++) {
        let userBox = createHtmlElement({tagName: "div", htmlClass: "user-box"});
        userBox.setAttribute("data-userId", userData[i].id);
        console.log(userData[i].username);
        let titleElement = createHtmlElement({
            tagName: "h4",
            htmlClass: "user-title",
            htmlAttributes: {
                textContent: userData[i].username,
                title: userData[i].username
            }
        });
        userBox.appendChild(titleElement);

        let userElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "user-info",
            htmlAttributes: {
                textContent: "Navn: " + userData[i].firstname + " " + userData[i].lastname + "\nFødt: " + userData[i].birthday +
                    "\nKøn: " + userData[i].gender + "\nBruger type: " + userData[i].role + "\nMedlemskab: " + userData[i].membershipStatus
            }
        });
        userElement.setAttribute('style', 'white-space: pre;');
        userBox.appendChild(userElement);
        userBox.addEventListener("click", handleGetUser);

        userContainerEl.appendChild(userBox);
    }

}

async function handleGetUser(event) {
    event.preventDefault();

    const userBox = event.target.closest("div");
    const userId = userBox.getAttribute("data-userId");
    if (userId !== null) {
        window.location.href = `/UserHandling/UserAdminView.html?userId=${userId}`;
    } else {
        console.log("box clicked");
    }
}
