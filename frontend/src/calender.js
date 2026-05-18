import {createHtmlElement} from "./htmlTagFactory.js";

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

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

    document.body.appendChild(containerEl);
}

function showCalenderMonth() {

    if(headerEl.children.length > 0) {
        while(headerEl.lastElementChild) {
            headerEl.removeChild(headerEl.lastElementChild)
        }
    }

    //Display header
    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

    let currentMonthTitleEl = createHtmlElement({tagName: "h2", htmlClass: "calender-current-month", htmlAttributes: {textContent: `${monthNames[currentMonth]}  ${currentYear}`}});

    let prevMonthButton = createHtmlElement({tagName: "button", htmlAttributes: {textContent: "Prev"}});
    prevMonthButton.dataset.function = "prev";
    let nextMonthButton = createHtmlElement({tagName: "button", htmlAttributes: {textContent: "Next"}});
    nextMonthButton.dataset.function = "next";
    headerEl.addEventListener("click", handlePrevMonth );
    headerEl.appendChild(prevMonthButton);
    headerEl.appendChild(currentMonthTitleEl);
    headerEl.appendChild(nextMonthButton);

    alert("showing calender")
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

    let firstDayInMonth = new Date(currentYear, currentMonth, 0).getDay();
    let lastDayInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    //Display previous month
    for(let i = firstDayInMonth; i > 0; i--) {
        calenderWeekDaysEl.appendChild(createEmptyListElement());
    }

    for(let weekDay = 1; weekDay <= lastDayInMonth; weekDay++) {
        let weekDayEl;
        if(weekDay === currentDate.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()){
            weekDayEl = createHtmlElement({tagName: "li", htmlClass: ["calender-week-day", "isToday"]});
        }else{
            weekDayEl = createHtmlElement({tagName: "li", htmlClass: "calender-week-day"});
        }

        //display events
        for(let i = 0; i < eventList.length; i++) {
            let eventDate = new Date(Date.parse(eventList[i].date));
            let eventBoxEl;
            if (weekDay === eventDate.getDate() && currentMonth === eventDate.getMonth() && currentYear === eventDate.getFullYear()) {
                eventBoxEl = createHtmlElement({
                    tagName: "div",
                    htmlClass: "calender-event-box",
                    htmlAttributes: {textContent: `${eventList[i].title}`}
                });
                weekDayEl.appendChild(eventBoxEl);
            }
        }

        weekDayEl.appendChild(createHtmlElement({tagName: "p", htmlClass: "default-cursor", htmlAttributes: {textContent: `${weekDay}`}}));

        calenderWeekDaysEl.appendChild(weekDayEl);
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

function handlePrevMonth(event){
    event.preventDefault();
    console.log(`${currentMonth}`)
    if(!event.target.closest("button")){
        return;
    }
    if(event.target.closest("button").dataset.function === "prev") {
        currentMonth = currentMonth - 1;
    }else if(event.target.closest("button").dataset.function === "next"){
        currentMonth = currentMonth + 1;
    }
    console.log(`${currentMonth}`)
    if(currentMonth < 0){
        console.log(`${currentMonth} < 0: ${currentDate}`)
        currentDate = new Date(currentYear, currentMonth, new Date().getDate());
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        console.log(`${currentDate}`)
    }else{
        currentDate = new Date(currentYear, currentMonth, 1);
        console.log(`${currentDate}`)
    }
    showCalenderMonth();

}