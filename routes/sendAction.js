const express = require('express');
const { DateTime } = require('luxon');

const router = express.Router();

// set global variables for recieving and sending actions
let postIP, postHostname, postBody, postTime, recentPostBody;

// gets post reqest from buttons in /remote_control
router.route('/send_action')
    .post((req, res) => {

        postIP = req.ip;
        postHostname = req.hostname;
        postBody = req.body.actions.action;
        postTime = DateTime.utc().toLocaleString(DateTime.DATETIME_FULL);

        recentPostBody = {
            // add username for user check
            action : postBody,
            time : postTime
        };
        let arrayOfData = [postIP, postHostname, postBody, postTime, recentPostBody]; 
        
        
        console.log(`recieved a POST request from ${postHostname}:${postIP}. \n body: ${postBody} \n time: ${recentPostBody.time}`);
        res.send('SERVER: successfully recieved post');
        
        return arrayOfData;
        })

    // extension sends get request to check if there was a recent post request
    .get((req, res) => {
        console.log(recentPostBody);
        res.send(recentPostBody);
    })

module.exports = router;