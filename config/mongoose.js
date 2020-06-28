//Setting up configuration for db for this app/
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/login_development');

const db = mongoose.connection;

//Throwing error in case if db doesnot get configured properly.
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//Throwing successful message if db gets created.
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;