define("tools/htmlTools", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.htmlToElementList = exports.htmlToElement = void 0;
    function htmlToElement(htmlString) {
        var template = document.createElement('template');
        htmlString = htmlString.trim();
        template.innerHTML = htmlString;
        return template.content.firstChild;
    }
    exports.htmlToElement = htmlToElement;
    function htmlToElementList(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.childNodes;
    }
    exports.htmlToElementList = htmlToElementList;
});
define("app", ["require", "exports", "tools/htmlTools"], function (require, exports, htmlTools_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var paragraph = htmlTools_1.htmlToElement("<p>Hello my friend!</p>");
    var divs = htmlTools_1.htmlToElementList("<div>So</div><div>many</div><div>elements</div><div>!!!</div>");
    document.body.appendChild(paragraph);
    divs.forEach(function (child) {
        document.body.appendChild(child);
    });
    document.body.append("<p>Can we append html this way</p><br><p>And if so, do we need the helper functions?</p>");
});
//# sourceMappingURL=app.js.map