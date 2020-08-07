/**
 * 
 * @param htmlString HTML representing a single element
 * 
 * Credit:
 * The original version of this function came from Stack Overflow user Mark
 * Amery.
 * Linked below is the question on Stack Overflow, and the user's profile.
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 * https://stackoverflow.com/users/1709587/mark-amery
 */
export function htmlToElement(htmlString: string): ChildNode {
    var template = document.createElement('template');
    htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = htmlString;
    return template.content.firstChild;
}

/**
 * 
 * @param htmlString HTML representing any number of sibling elements
 * 
 * Credit:
 * The original version of this function came from Stack Overflow user Mark
 * Amery.
 * Linked below is the question on Stack Overflow, and the user's profile.
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 * https://stackoverflow.com/users/1709587/mark-amery
 */
export function htmlToElementList(htmlString: string): NodeList {
    var template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.childNodes;
}
