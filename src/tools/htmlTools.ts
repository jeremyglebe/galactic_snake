// Remote refers to the electron process (from the launch script) that is
// running in node. Different from the rendering (html) and local scripts
// (scripts included by the HTML or imported from another local script)
const { remote } = window.require('electron');
// We will use remote to access Node's filesystem library
const fs = remote.require('fs');

/**
 * Transforms and HTML string into the objects it represents and returns the
 * first element in the list. This should not be used for groups of HTML
 * elements, but rather a single element or container.
 * @param htmlString HTML representing a single element
 * 
 * Credit:
 * The original version of this function came from Stack Overflow user Mark
 * Amery.
 * Linked below is the question on Stack Overflow, and the user's profile.
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 * https://stackoverflow.com/users/1709587/mark-amery
 */
export function stringToElement(htmlString: string): ChildNode {
    var template = document.createElement('template');
    htmlString = htmlString.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = htmlString;
    return template.content.firstChild;
}

/**
 * Transforms and HTML string into the objects it represents and returns the
 * list of elements.
 * @param htmlString HTML representing any number of sibling elements
 * 
 * Credit:
 * The original version of this function came from Stack Overflow user Mark
 * Amery.
 * Linked below is the question on Stack Overflow, and the user's profile.
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
 * https://stackoverflow.com/users/1709587/mark-amery
 */
export function stringtoElementList(htmlString: string): NodeList {
    var template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.childNodes;
}

export function fileToElement(htmlFile: string): ChildNode {
    return stringToElement(_fileContentsAsString(htmlFile));
}

export function fileToElementList(htmlFile: string): NodeList {
    return stringtoElementList(_fileContentsAsString(htmlFile));
}

function _fileContentsAsString(file: string) {
    try {
        let data = fs.readFileSync(file, 'utf8');
        console.log(`File: ${file}, Contents: ${data}`)
        return <string>data;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}