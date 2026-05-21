import {createHtmlElement} from "../htmlTagFactory.js";
import {displayNavigationBar} from "../navigationBars.js";
import {ValidateEmail} from "../UserHandling/inputValidation.js";

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

    const titleCreateUser = createHtmlElement({
        tagName: "h1",
        htmlAttributes: {textContent: "Opret Bruger"}
    })
    userFormEl.appendChild(titleCreateUser);
    /* const userIdEl = createHtmlElement({
         tagName: "input",
         htmlAttributes: {type: "hidden", name: "userId", id: "userId"}
     })
     userFormEl.appendChild(userIdEl);*/

    const usernameBox = createHtmlElement({
        tagName: "p"
    })
    usernameBox.id = "usernameBox";

    const usernameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "usernameInput", textContent: "Email:"}
    })
    usernameBox.appendChild(usernameLabelEL);

    const usernameInputEl = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "email", name: "mail", placeholder: "Eksempel@mail.com", id: "usernameInput"}
    });
    usernameInputEl.required = true;
    usernameLabelEL.appendChild(usernameInputEl);
    userFormEl.appendChild(usernameBox);

    const passwordBox = createHtmlElement({
        tagName: "p"
    })
    passwordBox.id = "passwordBox";

    const passwordLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "passwordInput", textContent: "Adgangskode:"}
    })
    passwordBox.appendChild(passwordLabelEL);
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
    passwordLabelEL.appendChild(passwordInputEL);
    userFormEl.appendChild(passwordBox);

    const firstnameBox = createHtmlElement({
        tagName: "p"
    })
    firstnameBox.id = "firstnameBox";

    const firstnameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "firstnameInput", textContent: "Fornavn (evt. mellemnavne):"}
    })
    firstnameBox.appendChild(firstnameLabelEL);
    const firstnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "firstname", placeholder: "Fornavn", id: "firstnameInput"}
    })
    firstnameInputEL.required = true;
    firstnameLabelEL.appendChild(firstnameInputEL);
    userFormEl.appendChild(firstnameBox);

    const lastnameBox = createHtmlElement({
        tagName: "p"
    })
    lastnameBox.id = "lastnameBox";

    const lastnameLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "lastnameInput", textContent: "Efternavn:"}
    })
    lastnameBox.appendChild(lastnameLabelEL);
    const lastnameInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "lastname", placeholder: "Efternavn", id: "lastnameInput"}
    })
    lastnameInputEL.required = true;
    lastnameLabelEL.appendChild(lastnameInputEL);
    userFormEl.appendChild(lastnameBox);

    const phoneNumberBox = createHtmlElement({
        tagName: "p"
    })
    phoneNumberBox.id = "phoneNumberBox";

    const phoneNumberLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "phoneInput", textContent: "MobilNummer:"}
    })
    phoneNumberBox.appendChild(phoneNumberLabelEL);
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
    phoneNumberLabelEL.appendChild(phoneNumberInputEL);
    userFormEl.appendChild(phoneNumberBox);

    const addressBox = createHtmlElement({
        tagName: "p"
    })
    addressBox.id = "addressBox";

    const addressLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "addressInput", textContent: "Fulde adresse:"}
    })
    addressBox.appendChild(addressLabelEL);
    const addressInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "address", placeholder: "Adresse", id: "addressInput"}
    })
    addressInputEL.required = true;
    addressLabelEL.appendChild(addressInputEL);
    userFormEl.appendChild(addressBox);


    const zipCodeBox = createHtmlElement({
        tagName: "p"
    })
    zipCodeBox.id = "zipCodeBox";
    const zipCodeLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "zipCodeInput", textContent: "Postnr:"}
    })
    zipCodeBox.appendChild(zipCodeLabelEL);
    const zipCodeInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "zipCode", placeholder: "0000", id: "zipCodeInput"}
    })
    zipCodeInputEL.required = true;
    zipCodeLabelEL.appendChild(zipCodeInputEL);
    userFormEl.appendChild(zipCodeBox);

    const cityLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "cityInput", textContent: "By:"}
    })
    const cityInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "text", name: "city", placeholder: "Annekspræstegårde", id: "cityInput"}
    })
    cityInputEL.required = true;

    const cityBox = createHtmlElement({
        tagName: "p"
    })
    cityBox.id = "cityBox";
    cityBox.appendChild(cityLabelEL);
    cityLabelEL.appendChild(cityInputEL);
    userFormEl.appendChild(cityBox);

    const birthdayLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "birthdayInput", textContent: "Fødselsdato:"}
    })
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

    const birthdayBox = createHtmlElement({
        tagName: "p"
    })
    birthdayBox.id = "birthdayBox";

    birthdayBox.appendChild(birthdayLabelEL);
    birthdayLabelEL.appendChild(birthdayInputEL);
    userFormEl.appendChild(birthdayBox);

    const genderBox = createHtmlElement({
        tagName: "p"
    })
    genderBox.id = "genderBox";

    const genderMaleLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "genderMale", textContent: "Mand"}
    })
    genderMaleLabelEL.id="gender1";
    genderBox.appendChild(genderMaleLabelEL);

    const genderMaleInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "radio", name: "gender", value: "male", id: "genderMale"}
    })
    genderMaleInputEL.required = true;
    genderMaleInputEL.checked = true;
    genderMaleLabelEL.appendChild(genderMaleInputEL);

    const genderFemaleLabelEL = createHtmlElement({
        tagName: "label",
        htmlAttributes: {for: "genderFemale", textContent: "Kvinde"}
    })
    genderFemaleLabelEL.id="gender2";
    genderBox.appendChild(genderFemaleLabelEL);

    const genderFemaleInputEL = createHtmlElement({
        tagName: "input",
        htmlAttributes: {type: "radio", name: "gender", value: "female", id: "genderFemale"}
    })
    genderFemaleInputEL.required = true;
    genderFemaleLabelEL.appendChild(genderFemaleInputEL);
    userFormEl.appendChild(genderBox);

    let submitButton = document.createElement("button")
    submitButton.textContent = `Opret bruger`;
    submitButton.id = 'submitButton';
    submitButton.type = `button`;
    submitButton.addEventListener("click", addUser)
    userFormEl.appendChild(submitButton);
}

async function addUser(event) {
    event.preventDefault();
    const formEl = event.target.closest("form");
    const formData = new FormData(formEl);
    const username = formData.get("mail").trim();
    if (ValidateEmail(username)) {
        alert("Mail adressen har ikke den korrekte format ( eksempel@mail.domæne )")
        return
    }

    const password = formData.get("password");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
    if (!passwordRegex.test(password) || password.length < 8) {
        alert("Adgangskode har ikke den korrekte format")
        return
    }

    const firstname = formData.get("firstname");
    const nameRegex = /^[a-zA-ZæøåÆØÅ](?!.*--)(?!.*\s{2})[a-zA-ZæøåÆØÅ\s-]{0,98}[a-zA-ZææøåÆØÅ]$/i;
    if (!nameRegex.test(firstname)) {
        alert("Fornavn kan kun indeholde bogstaver, bindestreger og mellemrum (bindestreg må ikke stå forrest eller bagerst i navnet)")
        return
    }
    const lastname = formData.get("lastname");
    if (!nameRegex.test(lastname)) {
        alert("Efternavn kan kun indeholde bogstaver, bindestreger og mellemrum (bindestreg må ikke stå forrest eller bagerst i navnet)")
        return
    }
    const phoneNumber = formData.get("phoneNumber");
    const digitsOnlyPattern = /^\d+$/;

    let phoneNumberLength = 8;
    if(phoneNumber.length !== phoneNumberLength || !digitsOnlyPattern.test(phoneNumber)){
        alert("Dit number må kun indeholde tal og have en længde på 8");
        return
    }
    const address = formData.get("address") + ";" + formData.get("zipCode") + ";" + formData.get("city");
   // const addressPattern = /^[a-zA-Z0-9 .-]+;[a-zA-Z0-9 .-]+;[a-zA-Z0-9 .-]+$/;
   // if (!addressPattern.test(address)) {
   //     console.log("Der er gået noget galt i sammensætning af adressen");
    //    alert("Der er gået noget galt i sammensætning af adressen");
      //  return
    //}

    const addressParts = address.split(";");
    console.log(addressParts[0]);
    const zipcode = addressParts[1];
    const zipcodeLength = 4;
    if (zipcode.length !== zipcodeLength || !digitsOnlyPattern.test(zipcode)) {
        console.log("Zipcode kan kun indeholde tal");
        alert("Zipcode kan kun indeholde tal");
        return
    }

    console.log(address);

    const birthday = formData.get("birthday");
    if(!birthday){
        alert("Der mangler en dato for fødsel")
        return;
    }
    const ageLowerLimit = 16, ageUpperLimit = 140;
    const dateOfBirth = Date.parse(birthday);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - ageLowerLimit, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - ageUpperLimit, today.getMonth(), today.getDate());
    console.log(dateOfBirth + " > " + minAgeDate )
    console.log(dateOfBirth + " < " + maxAgeDate)
    if (dateOfBirth > minAgeDate || dateOfBirth < maxAgeDate) {
        alert(`Fødselsdato er enten for langt i fortiden eller for kort tid siden. Man skal være ${ageLowerLimit} år for at oprette en profil`)
        return
    }
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