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
        if(gotData.index) {
            pageContext.textList.getItem(gotData.index).text = gotData.text;
        }
        else {
            pageContext.textList.push({ text: gotData.text });
        }
    }
    page.bindingContext = pageContext;
}
function listViewItemTap(item) {
    var dialogs = require("ui/dialogs");
    dialogs.action("", "Cancel", ["Edit", "Delete"]).then(function (result) {
        switch(result) {
            case "Edit":
                onEdit(item.index);
                break;
            case "Delete":
                pageContext.textList.splice(item.index, 1);
                break;
        } 
    });
}
function onAdd() {
    var frames = require("ui/frame");
    frames.topmost().navigate({
        moduleName: 'edit-page',
        context: {
            action: 'new',
            index: undefined
        }
    });
}
function onEdit(index) {
    var frames = require("ui/frame");
    frames.topmost().navigate({
        moduleName: 'edit-page',
        context: {
            action: 'edit',
            text: pageContext.textList.getItem(index).text,
            index: index
        }
    });
}
exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.onAdd = onAdd;
exports.onEdit = onEdit;
