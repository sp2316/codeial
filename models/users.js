const mongoose=require('mongoose');

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
    name:{
        type:String,
        required:true
    }

},{
    timestamps:true //Takes care of when user data is created and updated..shows date and time
});

const User=mongoose.model('User',userSchema);

module.exports=User;