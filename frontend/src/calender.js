import {createHtmlElement} from "./htmlTagFactory.js";

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

let displayedDate = currentDate;
let displayedYear = currentYear;
let displayedMonth = currentMonth;

let eventList;
let headerEl
let bodyEl;

export function displayCalender(inputList){
    eventList = inputList;
    let containerEl = createHtmlElement({tagName: "div", htmlClass: "calender-container"});

    headerEl = createHtmlElement({tagName: "div", htmlClass: "calender-header"});

    bodyEl = createHtmlElement({tagName: "div", htmlClass: "calender-body"});

    showCalenderMonth();

    containerEl.appendChild(headerEl);
    containerEl.appendChild(bodyEl);

    document.getElementById("page").appendChild(containerEl);
    document.body.addEventListener("keydown", handleChangeMonthKey);

}

function showCalenderMonth() {

    if(headerEl.children.length > 0) {
        while(headerEl.lastElementChild) {
            headerEl.removeChild(headerEl.lastElementChild)
        }
    }

    //Display header
    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

    let currentMonthTitleEl = createHtmlElement({tagName: "h2", htmlClass: "calender-current-month", htmlAttributes: {textContent: `${monthNames[displayedMonth]}  ${displayedYear}`}});

    let prevMonthButton = createHtmlElement({tagName: "button", htmlClass: "calender-prev-button", htmlAttributes: {textContent: "Prev"}});
    prevMonthButton.dataset.function = "prev";
    let nextMonthButton = createHtmlElement({tagName: "button", htmlClass: "calender-next-button", htmlAttributes: {textContent: "Next"}});
    nextMonthButton.dataset.function = "next";
    headerEl.addEventListener("click", handleChangeMonthButton );
    headerEl.appendChild(prevMonthButton);
    headerEl.appendChild(currentMonthTitleEl);
    headerEl.appendChild(nextMonthButton);

    //alert("showing calender")
    //if(bodyEl.children.length > 0) {
    console.log(bodyEl)
        while (bodyEl.lastElementChild) {
            bodyEl.removeChild(bodyEl.lastElementChild)
        }
        console.log(bodyEl)
    //}

    //Display day names
    let calenderWeekDayHeadersEl = createHtmlElement({tagName: "ul", htmlClass: "calender-weekdays-headers"});

    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Mandag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Tirsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Onsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Torsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Fredag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Lørdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Søndag"));

    //Display day numbers
    let calenderWeekDaysEl = createHtmlElement({tagName: "ul", htmlClass: "calender-weekdays"});

    let firstDayInMonth = new Date(displayedYear, displayedMonth, 0).getDay();
    let lastDayInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

    //Display previous month
    for(let i = firstDayInMonth; i > 0; i--) {
        calenderWeekDaysEl.appendChild(createEmptyListElement());
    }

    for(let weekDay = 1; weekDay <= lastDayInMonth; weekDay++) {
        let weekDayEl;
        if(weekDay === currentDate.getDate() && displayedMonth === currentMonth && displayedYear === currentYear){
            weekDayEl = createHtmlElement({tagName: "li", htmlClass: ["calender-week-day", "isToday"]});
        }else{
            weekDayEl = createHtmlElement({tagName: "li", htmlClass: "calender-week-day"});
        }

        //display events
        for(let i = 0; i < eventList.length; i++) {
            let eventDate = new Date(Date.parse(eventList[i].date));
            let eventBoxEl;
            if (weekDay === eventDate.getDate() && displayedMonth === eventDate.getMonth() && displayedYear === eventDate.getFullYear()) {
                eventBoxEl = createHtmlElement({
                    tagName: "div",
                    htmlClass: "calender-event-box",
                    htmlAttributes: {textContent: `${eventList[i].title}`}
                });
                eventBoxEl.setAttribute("data-eventId", eventList[i].id);
                weekDayEl.appendChild(eventBoxEl);
            }
        }

        weekDayEl.appendChild(createHtmlElement({tagName: "p", htmlClass: "default-cursor", htmlAttributes: {textContent: `${weekDay}`}}));

        calenderWeekDaysEl.appendChild(weekDayEl);
        calenderWeekDaysEl.addEventListener("click", handleEventClick);
    }
    bodyEl.appendChild(calenderWeekDayHeadersEl);
    bodyEl.appendChild(calenderWeekDaysEl);
}

function createCalenderHeader(name){
    return createHtmlElement({tagName: "li", htmlAttributes: {textContent: `${name}`}});
}

function createEmptyListElement(){
    return createHtmlElement({tagName: "li", htmlClass: "overflowDay"});
}

function handleChangeMonthButton(event){
    event.preventDefault();
    console.log(`Current: ${currentMonth}, displayed: ${displayedMonth}`)
    if(!event.target.closest("button")){
        return;
    }
    if(event.target.closest("button").dataset.function === "prev") {
        displayedMonth = displayedMonth - 1;
    }else if(event.target.closest("button").dataset.function === "next"){
        displayedMonth = displayedMonth + 1;
    }
    handleChangeMonth();
}

function handleChangeMonthKey(event){
    console.log(event.key)
    console.log(event.code)
    if(event.code === "KeyA" || event.code === "ArrowLeft") {
        displayedMonth = displayedMonth - 1;
    }else if(event.code ===  "KeyD" || event.code === "ArrowRight"){
        displayedMonth = displayedMonth + 1;
    }else{
        return;
    }
    handleChangeMonth();
}

function handleChangeMonth(){

    console.log(`Current: ${currentMonth}, displayed: ${displayedMonth}`)
    if(displayedMonth < 0 || displayedMonth > 11){
        console.log(`${displayedMonth} < 0: ${displayedDate}`)
        displayedDate = new Date(displayedYear, displayedMonth, new Date().getDate());
        displayedYear = displayedDate.getFullYear();
        displayedMonth = displayedDate.getMonth();
        console.log(`${displayedMonth} < 0: ${displayedDate}`)
        console.log(`Current: ${currentMonth}, displayed: ${displayedMonth}`)
    }else{
        displayedDate = new Date(displayedYear, displayedMonth, 1);
        console.log(`Current: ${currentDate}, displayed: ${displayedDate}`)
    }
    showCalenderMonth();

}

function handleEventClick(event){
    event.preventDefault();
    const clickedEvent = event.target;
    if(!clickedEvent.classList.contains("calender-event-box")) {
        return;
    }
    window.location.href = `/Event/EventInfo.html?eventId=${clickedEvent.getAttribute("data-eventId")}`;
}