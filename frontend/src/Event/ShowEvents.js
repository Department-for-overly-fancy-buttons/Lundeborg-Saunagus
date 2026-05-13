import {displayNavigationBar} from "../navigationBars.js";

document.addEventListener('DOMContentLoaded', initApp);

const BASE_URL = "/api/events";

let saunaMasterData = [];

async function initApp() {
    //requireNotLogIn();
    displayNavigationBar();
}