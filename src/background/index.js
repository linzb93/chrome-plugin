// content.js
const script = document.createElement('script');
script.src = chrome.runtime.getURL('js/chrome-sdk.js');
document.body.appendChild(script);
