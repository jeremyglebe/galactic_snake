define("tools/htmlTools", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fileToElementList = exports.fileToElement = exports.stringtoElementList = exports.stringToElement = void 0;
    var remote = window.require('electron').remote;
    var fs = remote.require('fs');
    function stringToElement(htmlString) {
        var template = document.createElement('template');
        htmlString = htmlString.trim();
        template.innerHTML = htmlString;
        return template.content.firstChild;
    }
    exports.stringToElement = stringToElement;
    function stringtoElementList(htmlString) {
        var template = document.createElement('template');
        template.innerHTML = htmlString;
        return template.content.childNodes;
    }
    exports.stringtoElementList = stringtoElementList;
    function fileToElement(htmlFile) {
        return stringToElement(_fileContentsAsString(htmlFile));
    }
    exports.fileToElement = fileToElement;
    function fileToElementList(htmlFile) {
        return stringtoElementList(_fileContentsAsString(htmlFile));
    }
    exports.fileToElementList = fileToElementList;
    function _fileContentsAsString(file) {
        try {
            var data = fs.readFileSync(file, 'utf8');
            console.log("File: " + file + ", Contents: " + data);
            return data;
        }
        catch (e) {
            console.log('Error:', e.stack);
        }
    }
});
define("app", ["require", "exports", "tools/htmlTools"], function (require, exports, htmlTools_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var paragraph = htmlTools_1.stringToElement("<p>Hello my friend!</p>");
    var divs = htmlTools_1.stringtoElementList("<div>So</div><div>many</div><div>elements</div><div>!!!</div>");
    document.body.appendChild(paragraph);
    divs.forEach(function (node) {
        document.body.appendChild(node);
    });
});
//# sourceMappingURL=app.js.map