const isDev = process.env.NODE_ENV === 'development';

export const getStorage = (key) => {
    if (isDev) {
        return new Promise((resolve) => {
            const dataStr = localStorage.getItem(key);
            try {
                resolve(JSON.parse(dataStr));
            } catch (error) {
                resolve(dataStr);
            }
        });
    } else {
        return chrome.storage.local.get([key]).then((data) => {
            return data[key];
        });
    }
};

export const setStroage = (obj) => {
    if (isDev) {
        const key = Object.keys(obj)[0];
        const value = Object.values(obj)[0];
        localStorage.setItem(key, JSON.stringify(value));
        return Promise.resolve();
    } else {
        return chrome.storage.local.set(obj);
    }
};

export const bridge = (obj) => {
    if (obj.key !== 'my-chrome-plugin') {
        return;
    }
    return new Promise((resolve) => {});
};
