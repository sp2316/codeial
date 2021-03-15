const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    //this defines the object id of like object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        //decides the type of object dynamically
        refPath:'onModel'
    },
    //this field is used for defining the type of liked object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment'] //value of onModel for each like can only be post or comment
    }
},{
    timestamps:true
});

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;