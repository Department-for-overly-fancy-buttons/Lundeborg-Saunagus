import {displayNavigationBar} from "./navigationBars.js";
import {displayCalender} from "./calender.js";

document.addEventListener("DOMContentLoaded", initApp);

const BASE_URL = "http://localhost:8080/api";

async function initApp() {
    displayNavigationBar();
    let events = await test()
    displayCalender(events);
}

async function test(){
    try{
        let response = await fetch("/api/events")
        if (!response.ok) {
            throw new Error("HTTP error!");
        }
        const events = await response.json();
        console.log(events);
        return events;
    }catch (error) {
        console.log("An error occurred:   " + error)

    }
}