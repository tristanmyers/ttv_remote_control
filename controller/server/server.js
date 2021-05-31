// SERVER FOR BOTH EXTENSION AND REMOTE CONTROL
// THEY COMMUNICATE OVER THE SAME SERVER
const express = require('express');

const rcRoutes = require('../routes/RCRoutes');

const app = express();

// will need to use this if i use forms for remote-controller buttons 
// router.use(express.urlencoded({ extended : true }));
app.use(express.json());


app.use(rcRoutes);

// for deploying to heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});