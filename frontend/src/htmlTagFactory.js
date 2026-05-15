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
        if (Array.isArray(elementInfo.htmlClass)) {
            //console.log(`htmlClass has multiple htmlClass`);
            //console.log(elementInfo.htmlClass.length)
            for(let i = 0; i < elementInfo.htmlClass.length; i++){
                //console.log(elementInfo.htmlClass[i])
                if(elementInfo.htmlClass[i].length > 0) {
                    element.classList.add(elementInfo.htmlClass[i]);
                }
                //console.log(element)
            }
        } else if (typeof elementInfo.htmlClass === "string" && 0 < elementInfo.htmlClass.length) {
            element.classList.add(elementInfo.htmlClass);
            //console.log(`htmlClass has one string ${classString}`);
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