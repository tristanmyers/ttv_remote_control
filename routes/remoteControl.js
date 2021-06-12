var express = require('express');
var router = express.Router();

router.get('/remote_control', (req, res) => {
  res.sendFile('/remote-control.html', {root : 'views'});
})

module.exports = router;
