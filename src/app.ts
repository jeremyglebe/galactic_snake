import { htmlToElement, htmlToElementList } from 'tools/htmlTools';

let paragraph = htmlToElement("<p>Hello my friend!</p>");
let divs = htmlToElementList("<div>So</div><div>many</div><div>elements</div><div>!!!</div>");

document.body.appendChild(paragraph);
divs.forEach(
    (child) => {
        document.body.appendChild(child);
    }
);

document.body.append("<p>Can we append html this way</p><br><p>And if so, do we need the helper functions?</p>");