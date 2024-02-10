export default (obj) =>
    new Promise((resolve) => {
        window.postMessage(
            {
                key: 'lcp-web-content',
                method: obj.method,
                params: obj.params,
            },
            '*'
        );
        window.addEventListener('message', (ev) => {
            if (ev.data.key === 'lcp-content-web') {
                resolve(ev.data.params);
            }
        });
    });
