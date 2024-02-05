import dayjs from 'dayjs';
function bridge(obj) {
    chrome.runtime.sendMessage({
        key: 'my-chrome-plugin',
        method: obj.method,
        params: obj.params,
    });
    return new Promise((resolve) => {
        chrome.runtime.onMessage.addListener(resolve);
    });
}
function isInTimeRange(timeList) {
    return timeList.some((timeRange) => {
        const [start, end] = timeRange.split('~');
        return (
            dayjs().isAfter(`${dayjs().format('YYYY-MM-DD')} ${start}:00`) &&
            dayjs().isBefore(`${dayjs().format('YYYY-MM-DD')} ${end}:00`)
        );
    });
}
setTimeout(async () => {
    const setting = await bridge({
        method: 'getSetting',
    });
    const match = setting.websites.find((item) => location.origin.startsWith(item.url));
    if (match && isInTimeRange(setting.timeList)) {
        // 创建一个新的div元素
        var overlay = document.createElement('div');

        // 设置元素的样式
        overlay.style.zIndex = '2023';
        overlay.style.position = 'fixed';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(255,255,255,0.5)';
        overlay.style.fontSize = '80px';

        // 添加文本内容（可选）
        overlay.textContent = '上班期间禁止访问！';

        // 将元素插入到body元素中
        document.body.appendChild(overlay);
        const uid = new Date().getTime();
        await bridge({
            method: 'log',
            params: {
                uid,
                createTime: dayjs().format('YYYY-MM-DD'),
                webName: match.name,
            },
        });

        overlay.onclick = function () {
            document.body.removeChild(overlay);
            bridge({
                method: 'changeForce',
                params: {
                    uid,
                },
            });
        };
    }
}, 1000);
