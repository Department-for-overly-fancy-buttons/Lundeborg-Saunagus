const user = getLoggedInUser();

async function setLoggedInUser() {
    try{
    const response = await fetch(`/api/users/user`);
    if (!response.ok) {
        throw new Error("HTTP error!");
    }
    const authentication = await response.json();
    localStorage.setItem("user", JSON.stringify(authentication));
    } catch (error) {
        console.log("An error occurred:   " + error)
    }
}

function getLoggedInUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;

}

function isLoggedIn() {
    return getLoggedInUser() !== null;
}

function requireLogIn() {
    if (!isLoggedIn()) {
        return location.href = "/Login/LoginForm.html";
    }
}

function login() {
    return location.href = "/Login/LoginForm.html"
}

async function logout() {
    try {
        const csrfToken = getCsrfToken();

        const response = await fetch(`/api/logout`, {
            method: "POST",
            headers: {
                "X-XSRF-TOKEN": csrfToken || ""

            }
        });

        if (!response.ok) {
            throw new Error("Logout failed.");
        }

        // Remove user info from local storage
        localStorage.removeItem("user")
        await setLoggedInUser();
        return location.href = "../index.html"

    } catch (error) {
        alert(error.message);
    }
}

function displayUser() {

    const user = getLoggedInUser();

    if (user) {
        const welcomeEl = document.getElementById("welcomeUser");

        if (welcomeEl) {
            welcomeEl.textContent = `Welcome ${user.username}`;
        }
    }
}

function requireAdmin() {
    const user = getLoggedInUser();
    if (!user || !user.roles.includes("ROLE_ADMIN")) {
        alert("You must be an admin to access this page!");
        //location.href = "/Login/LoginForm.html";
    }
}

function requireEmployee() {
    const user = getLoggedInUser();
    if (!user)
    {
        alert("You must be an admin and or employee to access this page!");
        //location.href = "/Login/LoginForm.html";
    }
    if(user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"))
    {
        return;
    }
    alert("You must be an admin and or employee to access this page!");
    //location.href = "LoginForm.html";
}

function getCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}