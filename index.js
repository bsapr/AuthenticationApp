
// Importing express and ejs layouts and setting up port number.
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//importing bcrypt for encrypting and decrypting passwords
var Bcrypt = require('bcryptjs');


//importing google social authentication library
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// Importing node-sass middleware in order to integrate scss files.
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//Importing mongoose configuration in order to create a db fpor this application. 
const db = require('./config/mongoose');
require('dotenv').config();



//Defining source and destination folders for scss and css files.
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

// Defining root folder for providing assets to our app
app.use(express.static('./assets'));

//Using expressLayouts for integrating layouts and partial with UI part
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up the view engine and defining the folder for views.
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);


// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Unfortunately. some error in running the server: ${err}`);
    }

    console.log(`Hey, Server is running on port: ${port}`);
});


