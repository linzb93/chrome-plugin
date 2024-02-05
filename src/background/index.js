const utils = {
    getSetting() {
        return chrome.storage.local.get(['setting']).then((data) => {
            return data.setting;
        });
    },
};

chrome.runtime.onMessage.addListener(async function (request) {
    if (request.key !== 'my-chrome-plugin' || !utils[request.method]) {
        return;
    }
    const output = await utils[request.method](request.params);
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tabs[0].id, output);
});
