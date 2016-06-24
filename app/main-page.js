var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var pageContext = new Observable({
    textList: new ObservableArray([
        { text: "foo" },
        { text: "bar" },
        { text: "baz" }
    ])
});

function pageLoaded(args) {
    var page = args.object;
    var gotData = page.navigationContext;
    if(gotData) {
        pageContext.textList.push({ text: gotData.text });
    }
    page.bindingContext = pageContext;
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
function onAdd() {
    var frames = require("ui/frame");
    frames.topmost().navigate("edit-page");
}
exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.onAdd = onAdd;
