const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({

    examID:{
        type: Number,
        required : true
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
        required:true
    }

});

const Question = mongoose.model('Question',QuestionSchema);

module.exports = Question;