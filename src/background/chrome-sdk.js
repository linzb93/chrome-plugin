window.sdk = {
    version: '0.1.0',
};

function Bridge(params) {
    return new Promise((resolve) => {
        window.postMessage({
            action: 'my-chrome-plugin',
            params,
        });
        window.addEventListener('message', resolve);
    });
}
function isInTimeRange(timeList) {
    return !!timeList;
}
(async () => {
    const setting = await Bridge({
        method: 'getSetting',
    });
    if (isInTimeRange(setting.timeList)) {
        // 创建遮罩阻止访问
    }
})();
