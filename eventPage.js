var contextMenuItem = {
    "id": "searchInKeeper",
    "title": "Search in Keeper",
    "contexts": ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "searchInKeeper" && clickData.selectionText) {
        chrome.storage.sync.set({'keyword': clickData.selectionText }, function () {
            chrome.tabs.create({
                url: chrome.extension.getURL('popup.html'),
                active: false
            }, function(tab) {
                // After the tab has been created, open a window to inject the tab
                chrome.windows.create({
                    tabId: tab.id,
                    type: 'popup',
                    focused: true
                });
            });
        });
    }
});
