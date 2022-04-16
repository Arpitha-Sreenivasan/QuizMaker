const mongoose=require('mongoose');


const CreateQuizSchema=new mongoose.Schema({
    id:{
        type:String,
        required:"Required field"
    },
    email:{
        type:String,
        required:"Required field"
    },
    details:{
        title:String,
        questions:[{
            quesNumber:Number,
            questionText:String,
            options:[String],
            answers:[String]
        }]
    }
});
module.exports=mongoose.model('CreateQuiz',CreateQuizSchema);