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
// 设置dom样式
function setStyle(el, styles) {
    const styleList = styles.split(';');
    for (const style of styleList) {
        const styleName = style.includes('-')
            ? style.split(':')[0].replace(/-[a-z]{1}/, (match) => match[1].toUpperCase())
            : style.split(':')[0];
        el.style[styleName] = style.split(':')[1];
    }
}

setTimeout(async () => {
    const setting = await bridge({
        method: 'getSetting',
    });
    const match = setting.websites.find((item) => location.origin.startsWith(item.url));
    if (match && isInTimeRange(setting.timeList)) {
        const uid = new Date().getTime();
        const overlay = document.createElement('div');
        setStyle(
            overlay,
            'z-index:20000;position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(255,255,255,0.5);font-size:80px;display:flex;justify-content:center;align-items:center'
        );
        const div = document.createElement('div');
        overlay.appendChild(div);
        const p = document.createElement('p');
        setStyle(p, 'color:#333;margin:0;');
        p.textContent = '上班期间禁止访问！';
        div.appendChild(p);
        const button = document.createElement('div');
        setStyle(
            button,
            'cursor:pointer;width:300px;height:80px;line-height:80px;border-radius:40px;text-align:center;font-size:30px;color:#409EFF;border:1px solid #409EFF;margin:30px auto'
        );
        button.textContent = '我真的要看';
        button.onclick = function () {
            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto';
            bridge({
                method: 'changeForce',
                params: {
                    uid,
                },
            });
        };
        div.appendChild(button);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        await bridge({
            method: 'log',
            params: {
                uid,
                createTime: dayjs().format('YYYY-MM-DD'),
                webName: match.name,
            },
        });
    }
}, 1000);
