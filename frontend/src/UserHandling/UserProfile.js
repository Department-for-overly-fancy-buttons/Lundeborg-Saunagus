import {displayNavigationBar} from "../navigationBars.js";
import {displayAdminNavigationBar} from "../adminNavigationBars.js";
import {validateDigitsOnly, validateEmail, validateName} from "./inputValidation.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users";

async function initApp() {
    displayNavigationBar();
    if(isAdmin()) {
        displayAdminNavigationBar();
    }
    const user = await fetchCurrentUser();


    if (!user) return;

    showUser(user);

    document.querySelector("form").addEventListener("submit", handleSubmit);
}

async function fetchCurrentUser() {
    try {
        const response = await fetch(`${BASE_URL}/user`);

        if (!response.ok) {
            throw new Error("Could not fetch user information");
        }

        return await response.json();

    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}


//function showUser(user) {
//    document.querySelector("#firstname").value = user.firstname;
//    document.querySelector("#lastname").value = user.lastname;
//    document.querySelector("#username").value = user.username;
//    document.querySelector("#phoneNumber").value = user.phoneNumber;
//    document.querySelector("#address").value = user.address;
//    document.querySelector("#birthday").value = user.birthday;
//}

async function handleSubmit(event) {
    event.preventDefault();

    console.log("SUBMIT START");

    const formData = new FormData(event.target);

    let firstname = formData.get("firstname");
    if (validateName(firstname)) {
        alert("Fornavn kan kun indeholde bogstaver, bindestreger og mellemrum (bindestreg må ikke stå forrest eller bagerst i navnet)")
        return
    }
    let lastname = formData.get("lastname");
    if (validateName(lastname)) {
        alert("Efternavn kan kun indeholde bogstaver, bindestreger og mellemrum (bindestreg må ikke stå forrest eller bagerst i navnet)")
        return
    }
    let username = formData.get("username");
    if(validateEmail(username)){
        alert("Mail adressen har ikke den korrekte format ( eksempel@mail.domæne )")
        return
    }
    let phoneNumber = formData.get("phoneNumber");
    let phoneNumberLength = 8;
    if(phoneNumber.length !== phoneNumberLength || validateDigitsOnly(phoneNumber)){
        alert("Dit number må kun indeholde tal og have en længde på 8");
        return
    }
    let address = formData.get("address") + ";" + formData.get("zipcode") + ";" + formData.get("city");
    const addressParts = address.split(";");
    console.log(addressParts[0]);
    const zipcode = addressParts[1];
    const zipcodeLength = 4;
    if (zipcode.length !== zipcodeLength || validateDigitsOnly(zipcode)) {
        console.log("Zipcode kan kun indeholde tal");
        alert("Zipcode kan kun indeholde tal");
        return
    }

    const userData = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        phoneNumber: phoneNumber,
        address: address
    };

    try {
        const response = await fetch(`${BASE_URL}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": getCsrfToken() || ""
            },
            body: JSON.stringify(userData)
        });

        console.log("STATUS:", response.status);

        const text = await response.text();
        console.log("RESPONSE:", text);

        if (!response.ok) {
            throw new Error("Update failed: " + response.status);
        }

        console.log("ABOUT TO REDIRECT");

        setTimeout(() => {
            window.location.href = "./UserDetails.html";
        }, 200);

    } catch (err) {
        console.error("Error updating user:", err);
    }
}

function showUser(user) {
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#username").value = user.username;
    document.querySelector("#phoneNumber").value = user.phoneNumber;
    const addressParts = user.address.split(" ");
    document.querySelector("#address").value = addressParts[0];
    document.querySelector("#zipcode").value = addressParts[1];
    document.querySelector("#city").value = addressParts[2];


}