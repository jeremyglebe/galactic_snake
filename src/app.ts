import { stringToElement, stringtoElementList, fileToElement, fileToElementList } from 'tools/htmlTools';

let paragraph = stringToElement("<p>Hello my friend!</p>");
let divs = stringtoElementList("<div>So</div><div>many</div><div>elements</div><div>!!!</div>");

document.body.appendChild(paragraph);
divs.forEach(
    (node) => {
        document.body.appendChild(node);
    }
);

// HTML Template Files are still broken...
// let fileFirstElement = fileToElement("menus/test.html");
// let fileElements = fileToElementList("menus/test.html");

// document.body.appendChild(fileFirstElement);
// fileElements.forEach(
//     (node) => {
//         document.body.appendChild(node);
//     }
// )