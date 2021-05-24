console.log("TTVREMOTE: twitch remote controller extension loaded.");

// if (chrome.tabs.highlighted == true) {
//     console.log(location.href);
// } else {
//     console.log("TTVREMOTE: something with wrong");
// }

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     console.log("testing" + tabs[1].id);
// })  // getting cannot read property of query of undefined


// i dont know if i will be using playwritght.
// const { chromium } = require('playwright');

// (async () => {
//     const browser = await chromium.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('https://www.twitch.tv/strawberryhacker');
//     await page.click('button.ixBesj');
//     await browser.close();
// })();

// play/pause button class name = ixBesj

// send get request for button action\
const response = fetch('http://localhost:8000/send_action');
console.log(response); 