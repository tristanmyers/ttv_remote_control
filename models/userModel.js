//functionality & logics related to the Database like insert, fetch, update, delete queries. 
const { MongoClient } = require('mongodb'); 

// accessing mongodb
const url = `mongodb+srv://admin:${process.env.MONGODB_PASS}@ttvrccluster.qpvms.mongodb.net/recentActions?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = {
    createUser: function() {
        let test = "test";
        return test;
    }
}