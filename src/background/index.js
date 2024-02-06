const utils = {
    getSetting() {
        return chrome.storage.local.get(['setting']).then((data) => {
            return data.setting;
        });
    },
    async log(params) {
        const data = await chrome.storage.local.get(['statistics']);
        const statistics = data.statistics || [];
        statistics.push(params);
        chrome.storage.local.set({ statistics });
    },
    async changeForce(params) {
        const { statistics } = await chrome.storage.local.get(['statistics']);
        const match = statistics.find((item) => item.uid === params.uid);
        if (!match) {
            return;
        }
        match.forced = true;
        chrome.storage.local.set({ statistics });
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
