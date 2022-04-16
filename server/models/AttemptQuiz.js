const mongoose=require('mongoose');


const AttemptQuizSchema=new mongoose.Schema({
    id:{
        type:String,
        required:"Required field"
    },
    email:{
        type:String,
        required:"Required field"
    },
    marks:{
        type:Number
    },
    details:[{
        quesNumber:Number,
        answers:[String]
    }]
});
module.exports=mongoose.model('AttemptQuiz',AttemptQuizSchema);