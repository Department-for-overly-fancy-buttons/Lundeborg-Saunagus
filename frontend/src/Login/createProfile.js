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
    const usernameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "usernameInput", textContent: "Email"}
    })
    userFormEl.appendChild(usernameLabelEL);

    const usernameInputEl = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "email", name: "username", placeholder: "Eksempel@mail.com", id: "usernameInput"}
    });
    usernameInputEl.required = true;
    userFormEl.appendChild(usernameInputEl);

    const passwordLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "passwordInput", textContent: "Adgangskode"}
    })
    userFormEl.appendChild(passwordLabelEL);
    const passwordInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {
            type: "password",
            name: "password",
            placeholder: "Adgangskode på mindst 8 tegn",
            id: "passwordInput"
        }
    })
    passwordInputEL.required = true;
    userFormEl.appendChild(passwordInputEL);

    const firstnameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "firstnameInput", textContent: "Fornavn (evt. mellemnavne)"}
    })
    userFormEl.appendChild(firstnameLabelEL);
    const firstnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "firstname", placeholder: "Fornavn", id: "firstnameInput"}
    })
    firstnameInputEL.required = true;
    userFormEl.appendChild(firstnameInputEL);

    const lastnameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "lastnameInput", textContent: "Efternavn"}
    })
    userFormEl.appendChild(lastnameLabelEL);
    const lastnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "lastname", placeholder: "Efternavn", id: "lastnameInput"}
    })
    lastnameInputEL.required = true;
    userFormEl.appendChild(lastnameInputEL);

    const phoneNumberLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "phoneInput", textContent: "MobilNummer"}
    })
    userFormEl.appendChild(phoneNumberLabelEL);
    const phoneNumberInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {
            type: "tel",
            name: "phoneNumber",
            placeholder: "01234567",
            id: "phoneNumberInput",
            pattern: "[0-9]",
            maxLength: 8
        }
    })
    phoneNumberInputEL.required = true;
    userFormEl.appendChild(phoneNumberInputEL);

    const addressLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "addressInput", textContent: "Fulde adresse"}
    })
    userFormEl.appendChild(addressLabelEL);
    const addressInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "address", placeholder: "Adresse", id: "addressInput"}
    })
    addressInputEL.required = true;
    userFormEl.appendChild(addressInputEL);

    const zipCodeLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "zipCodeInput", textContent: "Postnr"}
    })
    userFormEl.appendChild(zipCodeLabelEL);
    const zipCodeInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "zipCode", placeholder: "0000", id: "zipCodeInput"}
    })
    zipCodeInputEL.required = true;
    userFormEl.appendChild(zipCodeInputEL);

    const cityLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "cityInput", textContent: "By"}
    })
    userFormEl.appendChild(cityLabelEL);
    const cityInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "city", placeholder: "Annekspræstegårde", id: "cityInput"}
    })
    cityInputEL.required = true;
    userFormEl.appendChild(cityInputEL);

    const birthdayLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "birthdayInput", textContent: "Fødselsdato"}
    })
    userFormEl.appendChild(birthdayLabelEL);
    let date = new Date();
    let year = date.getFullYear() - 16;
    let month = date.getMonth().toString();
    if (month.length === 1) {
        month = '0' + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = '0' + day;
    }
    const birthdayInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {
            type: "date",
            name: "birthday",
            placeholder: "dd-mm-yyyy",
            id: "birthdayInput",
            min: "1910-04-01",
            max: `${year}-${month}-${day}`
        }
    })
    birthdayInputEL.required = true;
    userFormEl.appendChild(birthdayInputEL);

    const genderMaleInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "radio", name: "gender", value: "male", id: "genderMale"}
    })
    genderMaleInputEL.required = true;
    genderMaleInputEL.checked = true;
    userFormEl.appendChild(genderMaleInputEL);

    const genderMaleLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "genderMale", textContent: "Mand"}
    })
    userFormEl.appendChild(genderMaleLabelEL);


    const genderFemaleInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "radio", name: "gender", value: "female", id: "genderFemale"}
    })
    genderFemaleInputEL.required = true;
    userFormEl.appendChild(genderFemaleInputEL);

    const genderFemaleLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "genderFemale", textContent: "Kvinde"}
    })
    userFormEl.appendChild(genderFemaleLabelEL);

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        alert("Mail adresen har ikke den korrekte format")
        return
    }
    const password = formData.get("password");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password) || password.length < 8) {
        alert("Adgangskode har ikke den korrekte format")
        return
    }
    const firstname = formData.get("firstname");
    const firstnameRegex = /a/;
    if (firstnameRegex.test(firstname)) {
        alert("Fornavn kan kun indeholde bogstaver")
        return
    }
    const lastname = formData.get("lastname");
    const phoneNumber = formData.get("phoneNumber");
    const address = formData.get("address") + "," + formData.get("zipCode") + "," + formData.get("city");
    console.log(address);
    /*const zipCode = formData.get("zipCode");
    const city = formData.get("city");*/
    const birthday = formData.get("birthday");
    let gender;

    let genderOptions = document.getElementsByName('gender');

    for (let i = 0; i < genderOptions.length; i++) {
        if (genderOptions[i].checked)
            gender = genderOptions[i].value;
    }

    //const role = "CUSTOMER";

    const user = {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: phoneNumber,
        address: address,
        birthday: birthday,
        gender: gender
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