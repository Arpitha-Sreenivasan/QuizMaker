const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:"Required field"
    },
    password:{
        type:String,
        required:"Required field"
    }
});
module.exports=mongoose.model('Users',UserSchema);