const express = require('express');
const app=express();

const port=8000;


// linking static files
app.use(express.static('./assets'));

// adding Layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// add dataase mongoose
const db=require('./config/mongoose');

// use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views'); 

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})