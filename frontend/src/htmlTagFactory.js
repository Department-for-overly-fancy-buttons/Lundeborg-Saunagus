export function createHtmlElement(elementInfo){

    //console.log(elementInfo.tagName)

    if(typeof elementInfo !== "object" || !("tagName" in elementInfo)){
        return null;
    }

    let element;

    if(typeof elementInfo.tagName === "string"){
        element = document.createElement(elementInfo.tagName);
        //console.log("tag is valid string. Attempted to create element:");
        //console.log(element);
    }else{
        //console.log("tag is clearly an invalid string. returning element: null");
        return null;
    }

    if("htmlClass" in elementInfo) {
        let classString = null;
        if (Array.isArray(elementInfo.htmlClass)) {
            classString = elementInfo.htmlClass.reduce((previousClass, currentClass) => previousClass += " " + currentClass);
            //console.log(`htmlClass has multiple htmlClass ${classString}`);
        } else if (typeof elementInfo.htmlClass === "string") {
            classString = elementInfo.htmlClass;
            //console.log(`htmlClass has one string ${classString}`);
        }
        if (classString !== null) {
            element.classList.add(classString);
            //console.log(`htmlClassString is not null (${classString}) element:`);
            //console.log(element);
        }
    }

    if("htmlAttributes" in elementInfo){
        for(let htmlAttribute in elementInfo.htmlAttributes){
            element[htmlAttribute] = elementInfo.htmlAttributes[htmlAttribute];
        }
    }

    //console.log("returning");
    //console.log(element);

    return element;

}

export function createSvgElement(elementInfo){

    //console.log(elementInfo.tagName)

    if(typeof elementInfo !== "object" || !("tagName" in elementInfo)){
        return null;
    }

    let element;

    if(typeof elementInfo.tagName === "string"){
        element = document.createElementNS("http://www.w3.org/2000/svg", elementInfo.tagName);
        //console.log("tag is valid string. Attempted to create element:");
        //console.log(element);
    }else{
        //console.log("tag is clearly an invalid string. returning element: null");
        return null;
    }

    if("svgAttributes" in elementInfo){
        for(let svgAttribute in elementInfo.svgAttributes){
            element.setAttribute(svgAttribute, elementInfo.svgAttributes[svgAttribute]);
        }
    }

    //console.log("returning");
    //console.log(element);

    return element;

}