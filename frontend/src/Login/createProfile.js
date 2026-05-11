import {createHtmlElement} from "../htmlTagFactory.js";
import {displayNavigationBar} from "../navigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users";

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
    await display();
}

async function display() {
    const userFormEl = document.getElementById("userForm");
    userFormEl.innerHTML = "";

   /* const userIdEl = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "hidden", name: "userId", id: "userId"}
    })
    userFormEl.appendChild(userIdEl);*/

    const usernameInputEl = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "username", placeholder: "username", id: "usernameInput"}
    });
    usernameInputEl.required = true;
    userFormEl.appendChild(usernameInputEl);

    const passwordInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "password", name: "password", placeholder: "password", id: "passwordInput"}
    })
    passwordInputEL.required = true;
    userFormEl.appendChild(passwordInputEL);

    const firstnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "firstname", placeholder: "firstname", id: "firstnameInput"}
    })
    firstnameInputEL.required = true;
    userFormEl.appendChild(firstnameInputEL);

    const lastnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "lastname", placeholder: "lastname", id: "lastnameInput"}
    })
    lastnameInputEL.required = true;
    userFormEl.appendChild(lastnameInputEL);

    const phoneNumberInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "phoneNumber", placeholder: "phoneNumber", id: "phoneNumberInput"}
    })
    phoneNumberInputEL.required = true;
    userFormEl.appendChild(phoneNumberInputEL);

    const addressInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "address", placeholder: "address", id: "addressInput"}
    })
    addressInputEL.required = true;
    userFormEl.appendChild(addressInputEL);

    let submitButton = document.createElement("button")
    submitButton.textContent = `Submit`;
    submitButton.type = `button`;
    submitButton.addEventListener("click", addUser)
    userFormEl.appendChild(submitButton);

    let cancelButton = document.createElement("button")
    cancelButton.textContent = `cancel`;
    cancelButton.addEventListener("click", () => {
        userFormEl.reset();
        document.getElementById("default").setAttribute("selected", "selected")
    });

    userFormEl.appendChild(cancelButton);
}

async function addUser(event) {
    event.preventDefault();
    console.log("adding user")
    const formEl = event.target.closest("form");
    const formData = new FormData(formEl);
    const username = formData.get("username");
    const password = formData.get("password");
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const phoneNumber = formData.get("phoneNumber");
    const address = formData.get("address");

    //const role = "CUSTOMER";

    const user = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        address: address
        //role: role
    };
    /*   console.log(typeof formData.get("userId"))
       if (formData.get("userId") !== "") {
           const userId = formData.get("userId");

           try {
               const updatedUser = await fetchUpdateUser(userId, user);
               console.log("User updated:", updatedUser);
               await display();
               formEl.reset();
           } catch (error) {
               console.error(error);
               alert("Could not update user");
           }

       } else {*/

    try {
        const newUser = await fetchAddUser(user);
        console.log("User created:", newUser);

        formEl.reset();
    } catch (error) {
        console.error(error);
        alert("Could not create user");
    }
//    }
}

async function fetchAddUser(user) {
    const csrfToken = getCsrfToken()
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", "X-XSRF-TOKEN": csrfToken
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Failed to add user");
    }
    await display()
    return await response.json();
}