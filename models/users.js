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
    },
    avatar:{
        type:String,

    }

},{
    timestamps:true //Takes care of when user data is created and updated..shows date and time
});


let storage = multer.diskStorage({
    destination:function(req,file,cb){ //cb is callback
        cb(null,path.join(__dirname,'..',AVATAR_PATH)); //from current path to the storage path
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()); //field
    }
})

//static methods

userSchema.statics.uploadedAvatar= multer({
    storage:storage
}).single('avatar'); //this says that only one file would be uploaded for field name avatar but not array of files

userSchema.statics.avatarPath = AVATAR_PATH;

const User=mongoose.model('User',userSchema);

module.exports=User;