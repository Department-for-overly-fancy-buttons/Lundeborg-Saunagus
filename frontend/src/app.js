import {displayNavigationBar} from "./navigationBars.js";

document.addEventListener("DOMContentLoaded", initApp);

const BASE_URL = "http://localhost:8080/api";

async function initApp() {
    displayNavigationBar();
}