// chrome.tabs.query({active: true, currentWindow: true}, function tabs() {
//     console.log(`TTVREMOTE: ${tabs[1].id}`);
// });

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({color: '#3aa757'}, function() {
//     console.log("The color is green.");
//   });
// });

// registering service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/extension/sw.js')
      .then(reg => console.log('Service worker: Registered'))
      .catch(err => console.log(`Service worker: Error: ${err}`));
  })
}

