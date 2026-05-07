import {createHtmlElement} from "./htmlTagFactory.js";

export function displayNavigationBar(){

    const navEl = document.querySelector("nav");

    navEl.textContent = "";

    const listEl = createHtmlElement({tagName: "ul",htmlAttributes: {id: "navigationList"}});

    let listItemTitleEl = createHtmlElement({tagName: "li"});

    let homeLinkEl = createHtmlElement({tagName: "a", htmlClass: "navigationLink", htmlAttributes: {id: "logoTitle", href: "http://localhost", textContent: "KinoXP", title: "Home"}});

    listItemTitleEl.appendChild(homeLinkEl);

    listEl.appendChild(listItemTitleEl);

    let listItemTheatersEl = createHtmlElement({tagName: "li", htmlClass: "navigationListItem",htmlAttributes: {id: "navigationListStart"}});

    let theaterLinkEl = createHtmlElement({tagName: "a",htmlClass: "navigationLink", htmlAttributes: {href: "http://localhost/theaters/theaters.html", title: "Theaters", textContent: "Theaters"}});
    listItemTheatersEl.appendChild(theaterLinkEl);

    listEl.appendChild(listItemTheatersEl);

    let listItemLoginEl = createHtmlElement({tagName: "li", htmlClass:  "navigationListItem"});

    if (!isLoggedIn()) {
        let loginLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "Login", textContent: "Login"}});
        loginLinkEl.addEventListener("click", login);

        listItemLoginEl.appendChild(loginLinkEl);
    } else {
        let logoutLinkEl = createHtmlElement({tagName: "button", htmlClass: "navigationLink", htmlAttributes: {type: "button", title: "logout", textContent: "logout"}});
        logoutLinkEl.addEventListener("click", logout);
        listItemLoginEl.appendChild(logoutLinkEl);
    }

    listEl.appendChild(listItemLoginEl);


    navEl.appendChild(listEl);


}

