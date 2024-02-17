import dayjs from 'dayjs';
import debounce from 'throttle-debounce/debounce';
const utils = {
    getStorage(key) {
        return chrome.storage.local.get(key.split(',')).then((data) => {
            if (key.includes(',')) {
                return data;
            }
            return data[key];
        });
    },
    setStorage(obj) {
        if (typeof obj === 'string') {
            return;
        }
        return chrome.storage.local.set(obj);
    },
    getAllStorage() {
        const key = 'setting,statistics';
        return this.getStorage(key);
    },
    async log(params) {
        const data = await chrome.storage.local.get(['statistics']);
        const statistics = data.statistics || [];
        statistics.unshift(params);
        chrome.storage.local.set({ statistics });
    },
    async changeForce(params) {
        const data = await chrome.storage.local.get(['statistics']);
        const statistics = data.statistics || [];
        const match = statistics.find((item) => item.uid === params.uid);
        if (!match) {
            return;
        }
        match.forced = true;
        chrome.storage.local.set({ statistics });
    },
    async getAccessTimesToday(params) {
        const data = await chrome.storage.local.get(['statistics']);
        const statistics = data.statistics || [];
        if (!statistics.length) {
            return {
                times: 0,
            };
        }
        return {
            times: statistics.filter((item) => dayjs().isSame(item.createTime, 'd') && item.webName === params.name)
                .length,
        };
    },
};

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'background') {
        port.onMessage.addListener(async (request) => {
            if (!utils[request.method]) {
                return;
            }
            const output = await utils[request.method](request.params);
            port.postMessage({
                method: request.method,
                params: output,
                requestId: request.requestId,
            });
        });
    }
});

// 判断是否当前时间是否在时间范围列表内
function isInTimeRange(timeList) {
    return timeList.some((timeRange) => {
        const [start, end] = timeRange.split('~');
        return (
            dayjs().isAfter(`${dayjs().format('YYYY-MM-DD')} ${start}:00`) &&
            dayjs().isBefore(`${dayjs().format('YYYY-MM-DD')} ${end}:00`)
        );
    });
}
(async () => {
    // test 测试chrome.cookies
    chrome.cookies.getAll(
        {
            url: 'https://developer.chrome.com',
        },
        (data) => {
            console.log(data);
        }
    );
    chrome.webNavigation.onCompleted.addListener(
        debounce(800, async (details) => {
            const setting = await utils.getStorage('setting');
            const { url } = details;
            const match = setting.websites.find((item) => url.startsWith(item.url));
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            if (match && isInTimeRange(setting.timeList)) {
                utils.log({
                    webName: match.name,
                    createTime: dayjs().format('YYYY-MM-DD'),
                });
                if (setting.remindType === 1) {
                    const redirectUrl = chrome.runtime.getURL('template/forbid.html');
                    chrome.tabs.update(tabs[0].id, { url: redirectUrl });
                } else {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        key: 'my-chrome-plugin-background',
                        params: {
                            name: match.name,
                        },
                    });
                }
            }
        })
    );

    // 清理7天前的log
    const statistics = await utils.getStorage('statistics');
    const filterStats = statistics.filter((item) => !dayjs().subtract(7, 'd').isAfter(item.createTime));
    utils.setStorage('statistics', filterStats);
})();
