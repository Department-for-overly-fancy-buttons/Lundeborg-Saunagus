import {createHtmlElement} from "./htmlTagFactory.js";

export function displayAdminNavigationBar(){


    const navEl = document.querySelector("nav");

    const listEl = createHtmlElement({tagName: "ul",htmlAttributes: {id: "admin-nav-bar"}});

    navEl.appendChild(listEl);
    let listItemEventEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem"});

    let createEventLink = createHtmlElement({tagName: "button",htmlClass: ["navigationLink", "admin-nav-bar-link"], htmlAttributes: {type: "button", title: "Opret Begivenhed", textContent: "Opret Begivenhed"}});
    createEventLink.addEventListener("click", () => window.location.href = "/Event/CreateEvent.html");
    listItemEventEl.appendChild(createEventLink);

    listEl.appendChild(listItemEventEl);

    let listItemAllTicketsEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem"});

    let createAllTicketsLink = createHtmlElement({tagName: "button",htmlClass: ["navigationLink", "admin-nav-bar-link"], htmlAttributes: {type: "button", title: "Alle Billetter", textContent: "Alle Billetter"}});
    createAllTicketsLink.addEventListener("click", () => window.location.href = "/Ticket/ReservedTickets.html");
    listItemAllTicketsEl.appendChild(createAllTicketsLink);

    listEl.appendChild(listItemAllTicketsEl);

    let listItemAllUsersEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem"});

    let allUsersLink = createHtmlElement({tagName: "button",htmlClass: ["navigationLink", "admin-nav-bar-link"], htmlAttributes: {type: "button", title: "Alle Profiler", textContent: "Alle Profiler"}});
    allUsersLink.addEventListener("click", () => window.location.href = "/UserHandling/ShowUsers.html");
    listItemAllUsersEl.appendChild(allUsersLink);

    listEl.appendChild(listItemAllUsersEl);

    let listItemAllEventsEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem"});

    let allEventsLink = createHtmlElement({tagName: "button",htmlClass: ["navigationLink", "admin-nav-bar-link"], htmlAttributes: {type: "button", title: "Alle Begivenheder", textContent: "Alle Begivenheder"}});
    allEventsLink.addEventListener("click", () => window.location.href = "/Event/ShowEvents.html");
    listItemAllEventsEl.appendChild(allEventsLink);

    listEl.appendChild(listItemAllEventsEl);

    navEl.appendChild(listEl)
    //navEl.textContent = "";

    /*const listEl = createHtmlElement({tagName: "ul",htmlAttributes: {id: "navigationList"}});

    let listItemTitleEl = createHtmlElement({tagName: "li"});

    let homeLinkEl = createHtmlElement({tagName: "a", htmlClass: "navigationLink", htmlAttributes: {id: "logoTitle", href: "http://localhost", textContent: "omepage", title: "Home"}});

    listItemTitleEl.appendChild(homeLinkEl);

    listEl.appendChild(listItemTitleEl);

    let listItemEventEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem",htmlAttributes: {id: "navigationListStart"}});

    let createEventLink = createHtmlElement({tagName: "button",htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Events", textContent: "Opret event", id: "navigationListStart"}});
    createEventLink.addEventListener("click", () => window.location.href = "/Event/CreateEvent.html");
    listItemEventEl.appendChild(createEventLink);

    listEl.appendChild(listItemEventEl);

    let listItemTicketsEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem"});

    let createTicketsLink = createHtmlElement({tagName: "button",htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Tilmeldinger", textContent: "Tilmeldinger"}});
    createTicketsLink.addEventListener("click", () => window.location.href = "/Ticket/MyTickets.html");
    listItemTicketsEl.appendChild(createTicketsLink);

    listEl.appendChild(listItemTicketsEl);

    let listItemLoginEl = createHtmlElement({tagName: "li", htmlClass:  "navigationListItem"});

    if (!isLoggedIn()) {
        let loginLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Login", textContent: "Login"}});
        loginLinkEl.addEventListener("click", login);

        //let listItemCreateAccountEl = createHtmlElement({tagName: "li", htmlClass:  "navigationListItem"});
        let createAccountLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Opret profil", textContent: "Opret profil"}});
        createAccountLinkEl.addEventListener("click", () => location.href = "/Login/CreateAccount.html");

        listItemLoginEl.appendChild(loginLinkEl);
        listItemLoginEl.appendChild(createAccountLinkEl);
    } else {
        let logoutLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "log ud", textContent: "log ud"}});
        logoutLinkEl.addEventListener("click", logout);
        listItemLoginEl.appendChild(logoutLinkEl);
    }


    listEl.appendChild(listItemLoginEl);


    navEl.appendChild(listEl);*/


}

