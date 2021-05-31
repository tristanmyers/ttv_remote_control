// SERVER FOR BOTH EXTENSION AND REMOTE CONTROL
// THEY COMMUNICATE OVER THE SAME SERVER

require('dotenv').config();

// third party modules
const express = require('express');
const { urlencoded, json } = require('express');
const axios = require('axios').default;
const { DateTime } = require('luxon');
// const handlebars = require('handlebars');


// const template = handlebars.templates;

const app = express.app();

// will need to use this if i use forms for remote-controller buttons 
// app.use(express.urlencoded({ extended : true }));
app.use(express.json());

// loading dynamic files part of index.html
app.use(express.static('/views/'));

// app.set('views', 'views/home')
// app.set('view engine', 'handlebars');

// will be serving /view/home/index.pug that displays info about the remote control
app.get('/',(req, res) => {
    // res.render('index.handlbars');
    res.send('will add page here one day');
});

// loading dynamic files part of remote-control.html
app.use(express.static('views/remote_control/'));

app.route('/remote_control')
    .get((req ,res) => {
        res.sendFile('remote_control/remote-control.html', {root : 'views/'});
    })


// gets post reqest from buttons in /remote_control
app.route('/send_action')
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

// twitch oauth
app.route('/login')
    .get((req, res) => {
        // login link makes user send get request via browser instead of server.
        // this gives a temporary code to exchange for the accessToken
        res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_AUTH_REDIRECT_URI}&scope=user:read:follows+user:read:email&state=c3ab8aa609ea11e793ae92361f002671`);
    })

// after /login authorization succeeds, then redirects to /auth_callback for access token then redirects back to /remote_control.
app.route('/auth_callback')
    .get(async ( {query: { code } }, req, res) => {

        // getting access token
        let options = {
            headers: {accept: 'application/json'},
        };
        
        try {
            accessTokenResponse = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.TWITCH_REDIRECT_URI}`, options);
            
            accessToken = accessTokenResponse.data.access_token;
            req.redirect('/remote_control');
        
        } catch (error) {
            console.error(`Getting access token error: ${error.message}`);
        }
        
        
        // refreshing access token if it expires_in 1000 or less
        refreshToken = accessTokenResponse.data.refresh_token;
        if (accessTokenResponse.data.expires_in <= 1000) {
            try { 
                const refreshTokenRes = await axios.post(`https://id.twitch.tv/oauth2/token--data-urlencode?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}`);
                console.log(`Access token refreshed!: ${refreshTokenRes}`);
                req.redirect('/remote_control');
            } catch(error) {
                console.error(`Refreshing token error: ${error.message}`);
            }
        } else {
            console.log('Token does not need refreshing.');
        }

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

            const twitchUserID = await userData.data.data[0]['id'];
            const twitchUserName = await userData.data.data[0]['display_name'];

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

    })

app.get('/getUser', () => {
    let twitchUserObj = {
        userName: `${twitchUserName}`
    }

    res.send(`${twitchUserObj.twitchUserName}`);
})



// for deploying to heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});