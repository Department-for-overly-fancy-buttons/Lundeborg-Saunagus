import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users";

let userData = [];
let filteredUserData = [];

async function initApp() {
    displayNavigationBar();
    if (isAdmin()) {
        displayAdminNavigationBar();
    }
    userData = await fetchUsers();
    display(userData);
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


function display(memberList) {
    let userContainerEl = document.querySelector("#user-container");
    userContainerEl.innerHTML = "";

    let membershipLabel = document.createElement("label");
    membershipLabel.id = "membershipLabel";
    membershipLabel.textContent = "Se medlemmer med typen";
    let membershipSelect = document.createElement("select");
    membershipSelect.setAttribute("id", "Membership");
    membershipLabel.appendChild(membershipSelect);

    let membershipData = ["Vælg medlemstype", "Se alle - " + userData.length,
        "Aktiv - " + filterUsersByMembershipStatus("ACTIVE").length,
        "Venteliste - " + filterUsersByMembershipStatus("PENDING").length,
        "Inaktiv - " + filterUsersByMembershipStatus("INACTIVE").length,
        "Passiv - " + filterUsersByMembershipStatus("PASSIVE").length];
    let membershipDataValues = ["", "ALL", "ACTIVE", "PENDING", "INACTIVE", "PASSIVE"];

    for (let i = 0; i < membershipData.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("label", membershipData[i]);
        option.setAttribute("value", membershipDataValues[i]);
        membershipSelect.appendChild(option);
    }
    membershipSelect.addEventListener("change", displayWithFilter);
    userContainerEl.appendChild(membershipLabel);

    for (let i = 0; i < memberList.length; i++) {
        let userBox = createHtmlElement({tagName: "div", htmlClass: "user-box"});
        userBox.setAttribute("data-userId", memberList[i].id);
        console.log(memberList[i].username);
        let titleElement = createHtmlElement({
            tagName: "h4",
            htmlClass: "user-title",
            htmlAttributes: {
                textContent: memberList[i].username,
                title: memberList[i].username
            }
        });
        userBox.appendChild(titleElement);

        let userElement = createHtmlElement({
            tagName: "h5",
            htmlClass: "user-info",
            htmlAttributes: {
                textContent: "Navn: " + memberList[i].firstname + " " + memberList[i].lastname + "\nFødt: " + memberList[i].birthday +
                    "\nKøn: " + memberList[i].gender + "\nBruger type: " + memberList[i].role + "\nMedlemskab: " + memberList[i].membershipStatus
            }
        });
        userElement.setAttribute('style', 'white-space: pre;');
        userBox.appendChild(userElement);
        userBox.addEventListener("click", handleGetUser);

        userContainerEl.appendChild(userBox);
    }

}

function displayWithFilter(event) {
    event.preventDefault();
    let membershipSelect = document.querySelector("#Membership");
    const membershipStatus = membershipSelect.value;
    display(filterUsersByMembershipStatus(membershipStatus));
}

function filterUsersByMembershipStatus(membershipStatus) {
    if (membershipStatus === "ALL") {
        return userData;
    }
    return userData.filter(user => user.membershipStatus === membershipStatus);
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
