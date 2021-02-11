const mongoose=require('mongoose');

const multer = require('multer');
const path= require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    name:{  // these keys must have the same name as the name given in form inorder for them to match
        type:String,
        required:true
    }

},{
    timestamps:true //Takes care of when user data is created and updated..shows date and time
});

const User=mongoose.model('User',userSchema);

module.exports=User;