document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users/user";

async function initApp() {
    const user = await fetchCurrentUser();

    if (!user) return;

    showUser(user);

    document.querySelector("form").addEventListener("submit", handleSubmit);
    document.querySelector("#editBtn").addEventListener("click", enableEditMode);
}



async function fetchCurrentUser() {
    try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("Could not fetch user information");
        }

        return await response.json();

    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}



function showUser(user) {
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#username").value = user.username;
    document.querySelector("#phoneNumber").value = user.phoneNumber;
    document.querySelector("#address").value = user.address;
    document.querySelector("#birthday").value = user.birthday;

    setInputsDisabled(true);
}



function enableEditMode() {
    setInputsDisabled(false);
}



function setInputsDisabled(state) {
    document.querySelector("#firstname").disabled = state;
    document.querySelector("#lastname").disabled = state;
    document.querySelector("#username").disabled = state;
    document.querySelector("#phoneNumber").disabled = state;
    document.querySelector("#address").disabled = state;
}



async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        username: formData.get("username"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
    };

    const csrfToken = getCsrfToken();

    try {
        const response = await fetch(`${BASE_URL}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": csrfToken || ""
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Update failed: " + response.status);
        }

        const result = await response.json();
        console.log("User updated:", result);

        window.location.href = "../index.html";

    } catch (err) {
        console.error("Error updating user:", err);
    }
}