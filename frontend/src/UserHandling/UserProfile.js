document.addEventListener('DOMContentLoaded', initApp);
const BASE_URL = "/api/users/user";

async function initApp() {
    await display()

}

async function display() {
    const user = await fetchCurrentUser();
    showUser(user);


}

async function fetchCurrentUser() {

    try {
        const response = await fetch(BASE_URL)

        if (!response.ok) {
            throw new Error("Could not fetch user information")
        }
        const user = await response.json()
        userData = user;
        return user
    } catch (error) {
        console.log("An error occurred " + error)
    }

}
async function handleSubmit(user, event) {
    event.preventDefault()
    const formElement = event.target.closest("form")
    const formData = new formData(formElement)
    
    const userData = {
        username: formData.get("#username"),
        password: formData.get("#password"),
        phoneNumber: formData.get("#phonenumber"),
        address: formData.get("#address"),
    }
    const response = await fetch({
        method: "POST",
        headers: {
            "X-XSRF-TOKEN": csrfToken || ""},
        body: JSON.stringify(user)
    })

    const result = await response.json();
    console.log("User data updated: ", result)
    //insert til html
    window.location.href =


    }

}


async function showUser(user) {
    document.querySelector("#firstname").textContent = user.firstname;
    document.querySelector("#lastname").textContent = user.lastname;
    document.querySelector("#username").textContent = user.username;
    document.querySelector("#phoneNumber").textContent = user.phoneNumber;
    document.querySelector("#address").textContent = user.address;
    document.querySelector("#birthday").textContent = user.birthday;

}

async function editUserProfile(user) {
    const firstnameinput = document.querySelector("#firstname")
    const lastnameinput = document.querySelector("#lastname")
    const usernameinput = document.querySelector("#username")
    const phoneNumberinput = document.querySelector("#phoneNumber")
    const addressinput = document.querySelector("#address")

    document.getElementById("submitEditUser").addEventListener("click", handleSubmit)

}