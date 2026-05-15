import {createHtmlElement} from "./htmlTagFactory.js";

export function displayCalender(eventList){

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let containerEl = createHtmlElement({tagName: "div", htmlClass: "calender-container"});

    let headerEl = createHtmlElement({tagName: "div", htmlClass: "calender-header"});

    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

    let currentMonthTitleEl = createHtmlElement({tagName: "h2", htmlClass: "calender-current-month", htmlAttributes: {textContent: `${monthNames[currentMonth]}  ${currentYear}`}});

    headerEl.appendChild(currentMonthTitleEl);

    let bodyEl = createHtmlElement({tagName: "div", htmlClass: "calender-body"});

    let calenderWeekDayHeadersEl = createHtmlElement({tagName: "ul", htmlClass: "calender-weekdays-headers"});



    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Mandag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Tirsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Onsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Torsdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Fredag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Lørdag"));
    calenderWeekDayHeadersEl.appendChild(createCalenderHeader("Søndag"));

    let calenderWeekDaysEl = createHtmlElement({tagName: "ul", htmlClass: "calender-weekdays"});

    let firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();
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
                console.log("Is today")
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

    containerEl.appendChild(headerEl);
    containerEl.appendChild(bodyEl);

    document.body.appendChild(containerEl);
}

function createCalenderHeader(name){
    return createHtmlElement({tagName: "li", htmlAttributes: {textContent: `${name}`}});
}

function createEmptyListElement(){
    return createHtmlElement({tagName: "li", htmlClass: "overflowDay"});
}