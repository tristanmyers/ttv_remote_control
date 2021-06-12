// SERVER FOR BOTH EXTENSION AND REMOTE CONTROL
// THEY COMMUNICATE OVER THE SAME SERVER

require('dotenv').config();

const express = require('express');
// const handlebars = require('handlebars');

// const template = handlebars.templates;

const homeRouter = require('./routes/home');
const remoteControlRouter = require('./routes/remoteControl');
const sendActionRouter = require('./routes/sendAction');
const loginRouter = require('./routes/login');
const getUserRouter = require('./routes/getUser');

// app.set('views', 'views/home')
// app.set('view engine', 'handlebars');

const app = express();

app.use(express.json());
// will need to use this if i use forms for remote-controller buttons 
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'))

app.use('/', homeRouter);
app.use('/', remoteControlRouter);
app.use('/', sendActionRouter);
app.use('/', loginRouter)
app.use('/', getUserRouter)


// for deploying to heroku
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});