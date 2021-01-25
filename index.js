const express = require('express');
const cookieParser= require('cookie-parser');
const app=express();
const port=8000;

// adding Layouts
const expressLayouts=require('express-ejs-layouts');

// add database mongoose
const db=require('./config/mongoose');

// Used for Session cookie
const session =require('express-session');

const passport=require('passport');

const passportLocal=require('./config/passport-local-strategy');

//for storing session key in mongoDB
const MongoStore=require('connect-mongo')(session); //pass the session variable created above

//for requiring the node-sass-middleware module
const  sassMiddleware=require('node-sass-middleware');

// scss files need to be pre compiled before server starts,we set the settings here
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle: 'extended',
    prefix:'/css'
}));

// for forms
app.use(express.urlencoded());

// linking cookieparser
app.use(cookieParser());

// linking static files
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views'); 

// Mongo store is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000 * 60 * 100)  //no of minutes in milliseconds
    },
    store: new MongoStore({ //MongoStore created above
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err||'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})