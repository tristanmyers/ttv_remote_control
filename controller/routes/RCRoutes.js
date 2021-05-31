require('dotenv').config();


const express = require('express');
const router = express.Router();

const twitch = require('../modules/api/twitch/twitchAuthController');

const { DateTime } = require('luxon');


// loading dynamic files part of remote-control.html
router.use(express.static('views/remote_control/'));

router.get('/remote_control', (req) => {
    req.sendFile('remote_control/remote-control.html', {root : 'views/'});
})

 // twitch auth
// router.get('/login', (res) => {
//     twitch.redirectLogin();
// });

// router.get('/auth_callback', (res));

router.get('/getUser', () => {
    let twitchUserObj = {
        userName: `${twitchUserName}`
    }

    res.send(`${twitchUserObj.twitchUserName}`);
})


// gets post reqest from buttons in /remote_control
router.route('/send_action')
    .post((req, res) => {
        
        let postIP = req.ip;
        let postHostname = req.hostname;
        postBody = req.body.actions.action;
        postTime = DateTime.utc().toLocaleString(DateTime.DATETIME_FULL);

        recentPostBody = {
            action : postBody,
            time : postTime
        };

        console.log(`recieved a POST request from ${postHostname}:${postIP}. \n body: ${postBody} \n time: ${recentPostBody.time}`);
        res.send('SERVER: successfully recieved post');
        })

    // extension sends get request to check if there was a recent post request
    // recentPostBody is not defined for some stupid reason
    // .get(function (req, res) {
    //     res.send(recentPostBody);
    // })

module.exports = router;