(function() {
    var dissipateEnabled = false;
    var dissipateProcessing = false;
    var error = false;

    var enableDissipate = (function() {
        dissipateEnabled = true;
        chrome.browserAction.setIcon({path:"icon-on.png"});
        chrome.browserAction.setTitle({title:"Dissipate enabled"});
        chrome.webRequest.onBeforeRequest.addListener(dissipateCache, {urls: ["<all_urls>"]});
    });

    var disableDissipate = (function() {
        dissipateEnabled = false;
        chrome.browserAction.setIcon({path:"icon-off.png"});
        chrome.browserAction.setTitle({title:"Dissipate disabled"});
        chrome.webRequest.onBeforeRequest.removeListener(dissipateCache);
    });

    // https://developer.chrome.com/extensions/browsingData
    var dissipateCache = (function() {
        if (!dissipateProcessing) {
            if (typeof(chrome.browsingData) !== 'undefined') {
                // TODO: run some performance tests
                // dissipateProcessing = true;
                var callback = function () {
                    console.log('Cache dissipated');
                };
                var millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
                var oneWeekAgo = (new Date()).getTime() - millisecondsPerWeek;

                chrome.browsingData.removeCache({
                      "since": oneWeekAgo
                    }, callback);
            } else if (!error) {
                error = true;
                alert("Your browser does not support dissipate!");
            }
        }
    });

    var toggleDissipate = (function() {
        if (dissipateEnabled) {
            disableDissipate();
        } else {
            enableDissipate();
        }
    });

    chrome.browserAction.onClicked.addListener(toggleDissipate);
})();