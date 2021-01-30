const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    examID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Exam',
        required:false
    },
    choices:[{
        text:{
            type:String,
            required:true
        },
        isCorrect:{
            type:Boolean,
            required:true,
            default:false
        },
        _id:false

    }],
    title:{
        type:String,
        required:true
    },
    points:{
        type:Number,
        required:false
    }

});


const Question = mongoose.model('Question',QuestionSchema);

module.exports = Question;