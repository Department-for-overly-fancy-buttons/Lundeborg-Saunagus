import {createHtmlElement} from "./htmlTagFactory.js";

export function displayNavigationBar(){

    const navEl = document.querySelector("nav");

    navEl.textContent = "";

    const listEl = createHtmlElement({tagName: "ul",htmlAttributes: {id: "navigationList"}});

    let listItemTitleEl = createHtmlElement({tagName: "li"});

    let homeLinkEl = createHtmlElement({tagName: "a", htmlClass: "navigationLink", htmlAttributes: {id: "logoTitle", href: "http://localhost", textContent: "Homepage", title: "Home"}});

    listItemTitleEl.appendChild(homeLinkEl);

    listEl.appendChild(listItemTitleEl);

    let listItemTicketsEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem",htmlAttributes: {id: "navigationListStart"}});

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

        let showAccountLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Se profil", textContent: "Se profil"}});
        showAccountLinkEl.addEventListener("click", () => location.href = "/UserHandling/UserDetails.html");

        listItemLoginEl.appendChild(logoutLinkEl);
        listItemLoginEl.appendChild(showAccountLinkEl)
    }


    listEl.appendChild(listItemLoginEl);


    navEl.appendChild(listEl);


}

