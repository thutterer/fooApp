var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var pageContext = new Observable({
    newText: 'foo bar baz',
    textList: new ObservableArray([
        { text: "foo" },
        { text: "bar" },
        { text: "baz" }
    ])
});

function pageLoaded(args) {
    
    var page = args.object;

    page.bindingContext = pageContext;
}
function saveText() {
    pageContext.textList.push({ text: pageContext.newText });
    pageContext.newText = "";
}
function listViewItemTap(item) {
    var dialogs = require("ui/dialogs");
    dialogs.action("", "Cancel", ["Delete"]).then(function (result) {
        switch(result) {
            case "Delete":
                pageContext.textList.splice(item.index, 1);
                break;
        } 
    });
}
exports.pageLoaded = pageLoaded;
exports.saveText = saveText;
exports.listViewItemTap = listViewItemTap;
