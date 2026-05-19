import {createHtmlElement} from "./htmlTagFactory.js";

export function displayNavigationBar(){

    const navEl = document.querySelector("nav");

    navEl.textContent = "";

    const listEl = createHtmlElement({tagName: "ul",htmlAttributes: {id: "navigationList"}});

    let listItemTitleEl = createHtmlElement({tagName: "li"});

    let homeLinkEl = createHtmlElement({tagName: "a", htmlClass: "navigationLink", htmlAttributes: {id: "logoTitle", href: "http://localhost", textContent: "Homepage", title: "Home"}});

    listItemTitleEl.appendChild(homeLinkEl);

    listEl.appendChild(listItemTitleEl);

    let listItemEventEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem",htmlAttributes: {id: "navigationListStart"}});

    let createEventLink = createHtmlElement({tagName: "button",htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Events", textContent: "Opret event", id: "navigationListStart"}});
    createEventLink.addEventListener("click", () => window.location.href = "/Event/CreateEvent.html");
    listItemEventEl.appendChild(createEventLink);

    listEl.appendChild(listItemEventEl);

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


    navEl.appendChild(listEl);


}

