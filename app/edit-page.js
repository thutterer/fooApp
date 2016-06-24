var Observable = require("data/observable").Observable;
var pageContext = new Observable({
    newText: ''
});

function pageLoaded(args) {
    var page = args.object;
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
        context: { text: pageContext.newText }
    }    
    frames.topmost().navigate(navigationOptions);    
}
exports.pageLoaded = pageLoaded;
exports.onCancel = onCancel;
exports.onSave = onSave;
