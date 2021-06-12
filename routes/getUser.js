const express = require('express');

const getUserController = require('../controllers/userController');

const router = express.Router();

router.get('/getUser', (req, res) => {

    async function getCurrentUser() {
        // getting twitch user data
        options = { 
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
                'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
            }
        };
        
        try {
            userData = await axios.get('https://api.twitch.tv/helix/users', options);

            twitchUserID = await userData.data.data[0]['id'];
            twitchUserName = await userData.data.data[0]['display_name'];

            console.log(`${twitchUserName} successfully logged in!`);
            req.end();
        
        } catch (error) {
            console.error(`Getting username error: ${error.message}`);
        }

        if (userData['status'] == 200) {
            // this is where i render the username with mustaches onto the html
            // or i use ejs to create and if statement inside the html to check whether userData came back with a repsonse of 200 and render username
        } else {
            console.log('Status code for getting userData promise response was something other than 200');
        }
    }
    getCurrentUser();

    // let twitchUserObj = {
    //     userName: `${twitchUserName}`
    // }
    // res.send(`${twitchUserObj.twitchUserName}`);
})

module.exports = router;