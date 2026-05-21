document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/users/user";

async function initApp() {
    const user = await fetchCurrentUser();

    if (!user) return;

    showUser(user);

    document.querySelector("form").addEventListener("submit", handleSubmit);
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

    const userData = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        username: formData.get("username"),
        phoneNumber: formData.get("phoneNumber"),
        address: formData.get("address"),
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