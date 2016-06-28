var application = require("application");
application.cssFile = "./app.css";

var ObservableArray = require("data/observable-array").ObservableArray;
global.textList = new ObservableArray([
        { text: "foo" },
        { text: "bar" },
        { text: "baz" }
    ]);

application.start({ moduleName: "main-page" });
