document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users/user";

async function initApp() {
    const user = await fetchCurrentUser();

    if (!user) return;

    showUser(user);
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
    document.querySelector("#firstname").textContent = user.firstname;
    document.querySelector("#lastname").textContent = user.lastname;
    document.querySelector("#username").textContent = user.username;
    document.querySelector("#phoneNumber").textContent = user.phoneNumber;
    document.querySelector("#address").textContent = user.address;
    document.querySelector("#birthday").textContent = user.birthday;
}