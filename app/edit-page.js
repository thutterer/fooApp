var Observable = require("data/observable").Observable;
var pageContext = new Observable({
    text: '',
    index: undefined
});

function pageLoaded(args) {
    var page = args.object;
    var gotData = page.navigationContext;
    if(gotData) {
        pageContext.text = gotData.text;
        pageContext.index = gotData.index;
    }

    page.bindingContext = pageContext;
}
function onCancel() {
    var frames = require("ui/frame");
    frames.topmost().navigate("main-page");
}
function onSave() {
    var frames = require("ui/frame");
    if (pageContext.index === undefined) {
        global.textList.push({ text: pageContext.text });
    }
    else {
        global.textList.getItem(pageContext.index).text = pageContext.text;
    }
    frames.topmost().navigate('main-page');
}
exports.pageLoaded = pageLoaded;
exports.onCancel = onCancel;
exports.onSave = onSave;
