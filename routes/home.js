var express = require('express');
var router = express.Router();

// will be serving /view/home.handlebars that displays info about the remote control
router.get('/',(req, res) => {
  // res.render('home.handlbars');
  res.send('will add page here one day');
});

module.exports = router;
