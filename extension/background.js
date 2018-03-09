(function() {
    var dissipateEnabled = false;

    var enableDissipate = (function() {
        dissipateEnabled = true;
        chrome.browserAction.setIcon({path:"icon-on.png"});
        chrome.browserAction.setTitle({title:"Dissipate enabled"});
    });

    var disableDissipate = (function() {
        dissipateEnabled = false;
        chrome.browserAction.setIcon({path:"icon-off.png"});
        chrome.browserAction.setTitle({title:"Dissipate disabled"});
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