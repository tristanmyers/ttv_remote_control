const axios = require('axios').default;

function redirectLogin (res) {
    // login link makes user send get request via browser instead of server.
    // this gives a temporary code to exchange for the accessToken
    res.redirect(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${process.env.TWITCH_AUTH_REDIRECT_URI}&scope=user:read:follows+user:read:email&state=c3ab8aa609ea11e793ae92361f002671`);
};

// after /login authorization succeeds, then redirects to /auth_callback for access token then redirects back to /remote_control.
async function getAccessToken (req, {query: { code } }) {
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
}

module.export = {redirectLogin, getAccessToken};