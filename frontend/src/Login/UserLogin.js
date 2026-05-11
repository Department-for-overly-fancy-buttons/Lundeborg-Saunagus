const BASE_URL = "/api/users"

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formEl = event.target.closest("form");
        const formData = new FormData(formEl);
        const username = formData.get("username");
        const password = formData.get("password");

        let csrfToken = getCsrfToken();
        try {
            const response = await fetch(`${BASE_URL}/log_in`, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded", "X-XSRF-TOKEN": csrfToken},
                body: new URLSearchParams({ username, password })

            });

            if (response.ok) {

                await setLoggedInUser();
                loginForm.reset();
                window.location.href = "/index.html";

            } else {
                alert("Wrong username or password");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong with login.");
        }
    });

});