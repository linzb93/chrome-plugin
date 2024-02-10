function bridge(obj) {
    chrome.runtime.sendMessage({
        key: 'lcp-content-background',
        method: obj.method,
        params: obj.params,
    });
    return new Promise((resolve) => {
        chrome.runtime.onMessage.addListener((data) => {
            if (data.key === 'lcp-background-content') {
                resolve({
                    params: data.params,
                });
            }
        });
    });
}

// 处理从web接收的信息
window.addEventListener('message', async (ev) => {
    const sendData = ev.data;
    if (sendData.key === 'lcp-web-content') {
        const replyObj = await bridge({
            method: sendData.method,
            params: sendData.params,
        });
        window.postMessage(
            {
                key: 'lcp-content-web',
                params: replyObj.params,
            },
            '*'
        );
    }
});

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

chrome.runtime.onMessage.addListener(async (obj) => {
    if (obj.key !== 'my-chrome-plugin-background') {
        return;
    }
    const overlay = document.createElement('div');
    setStyle(
        overlay,
        'z-index:20000;position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(255,255,255,0.5);font-size:80px;display:flex;justify-content:center;align-items:center'
    );
    const div = document.createElement('div');
    div.style.textAlign = 'center';
    overlay.appendChild(div);
    const p1 = document.createElement('p');
    setStyle(p1, 'color:#333;margin:0;');
    p1.textContent = '上班期间禁止访问！';
    div.appendChild(p1);
    const accessTimes = await bridge({
        method: 'getAccessTimesToday',
        params: {
            name: obj.params.name,
        },
    });
    if (accessTimes.times >= 5) {
        const p2 = document.createElement('p');
        setStyle(p2, 'font-size: 66px;color:#f00;margin-top:10px;');
        p2.textContent = `今天已经打开过${accessTimes.times}次啦！`;
        div.appendChild(p2);
    }
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
            params: {},
        });
    };
    div.appendChild(button);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
});
