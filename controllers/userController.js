const userModel = require('../models/userModel');

module.exports={
    displayUser:function(req, res) {
       res.render(`<h1>${username}</h1>`);
   }
}