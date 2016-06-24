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
    var navigationOptions = {
        moduleName: 'main-page',
        context: {
            text: pageContext.text,
            index: pageContext.index
        }
    }
    frames.topmost().navigate(navigationOptions);
}
exports.pageLoaded = pageLoaded;
exports.onCancel = onCancel;
exports.onSave = onSave;
