import {displayNavigationBar} from "../navigationBars.js";
import {createHtmlElement} from "../htmlTagFactory.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const params = new URLSearchParams(window.location.search);
const userId = params.get("userId");
const BASE_URL = "/api/users";

let userData;

// async function fetchUpdateUser() {
//     try {
//         const response = await fetch(`${BASE_URL}/update/1`, {
//             method: "PUT",
//             headers: {"Content-Type": "application/json", "X-XSRF-TOKEN": getCsrfToken()},
//             body: JSON.stringify({
//                 username: "test",
//                 password: "test",
//                 firstname: "test",
//                 lastname: "test",
//                 phoneNumber: "test",
//                 address: "test",
//                 birthday: new Date(),
//                 gender: "test",
//                 role: "ADMIN",
//             })
//         });
//         if (!response.ok) {
//             console.log(response)
//             throw new Error("HTTP error!");
//         }
//         return await response.json();
//     } catch (error) {
//         console.log("An error occurred:   " + error)
//     }
// }

async function initApp() {
    displayNavigationBar();
    if (isAdmin()) {
        displayAdminNavigationBar();
    }
    userData = await fetchUser();
    display();
    //let test = await fetchUpdateUser();
}

async function fetchUser() {
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
    userContainerEl.innerHTML = "";
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
                "\nAdresse: " + userData.address + "\nMedlemskab: " + userData.membershipStatus
        }
    });
    userElement.setAttribute('style', 'white-space: pre;');
    userBox.appendChild(userElement);

    let membershipLabel = document.createElement("label");
    membershipLabel.textContent = "Sæt medlemskab";
    let membershipSelect = document.createElement("select");
    membershipSelect.setAttribute("id", "Membership");
    membershipLabel.appendChild(membershipSelect);

    let membershipData = ["Vælg medlemskab","Aktiv", "Venteliste", "Inaktiv", "Passiv"];
    let membershipDataValues = ["","ACTIVE", "PENDING", "INACTIVE", "PASSIVE"];

    for (let i = 0; i < membershipData.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("label", membershipData[i]);
        option.setAttribute("value", membershipDataValues[i]);
        membershipSelect.appendChild(option);
    }
    userBox.appendChild(membershipLabel);

    let submitButton = document.createElement("button")
    submitButton.textContent = `Opdater medlemskab`;
    submitButton.id = 'submitMembershipButton';
    submitButton.type = `button`;
    submitButton.addEventListener("click", updateMembershipStatus);
    userBox.appendChild(submitButton);

    userContainerEl.appendChild(userBox);
}

async function updateMembershipStatus(event) {
    event.preventDefault();
    let membershipSelect = document.querySelector("#Membership");
    const membershipStatus = membershipSelect.value;
    if(membershipStatus===""){
        return;
    }
    await fetchUpdateMembershipStatus(membershipStatus);
}

async function fetchUpdateMembershipStatus(membershipStatus) {
    const csrfToken = getCsrfToken()
    const response = await fetch(`${BASE_URL}/update/membership/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", "X-XSRF-TOKEN": csrfToken
        },
        body: (membershipStatus)
    });

    if (!response.ok) {
        throw new Error("Failed to update membership status");
    }
    userData = await fetchUser();
    await display()
    return await response.json();
}