const localURL = process.env.DEV_LOCAL_URL;
const publicURL = process.env.DEV_PUBLIC_URL;

const validActions = ['PLAY', 'PAUSE', 'REFRESH', 'FULLSCREEN', 'THEATER', 'CHANGECHANNEL'];

async function sendPost(url, buttonAction) {
    
    let response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            actions: {
                action: buttonAction
            }
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    });

    let result = await response.text();
    console.log(result);
}


// sendPost(localURL, 'PLAY');

// send a POST request to the server with the value of playPausedPressed
// as true or false. If false video is playing unless bttv autopause setting is on
let playPausePressed = false;

function videoPlayingCheck() {
    if (playPausePress == false) {
        return playPausePressed = true; // if there is a way to check is video is playing, do that instead.
    } else {
        return playPausePressed = false;
    }
}