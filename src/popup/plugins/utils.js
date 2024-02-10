import bridge from './bridge';
const isDev = process.env.NODE_ENV === 'development';

export const getStorage = (key) => {
    if (isDev) {
        return bridge({
            method: 'getStorage',
            params: key,
        });
    } else {
        return chrome.storage.local.get([key]).then((data) => {
            return data[key];
        });
    }
};

export const setStroage = (obj) => {
    if (isDev) {
        return bridge({
            method: 'setStorage',
            params: obj,
        });
    } else {
        return chrome.storage.local.set(obj);
    }
};
