chrome.runtime.onInstalled.addListener(() => {
	console.log('TTVRC: installed');
});

// registering service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then(reg => console.log(`Service worker: Registered with scope: ${reg.scope}`))
      .catch(err => console.log(`Service worker: ${err}`));
  })
};

// Call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');
});

// Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
});

// inject script everytime a post request from server to change state of player
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/scripts/content.js']
  });
});