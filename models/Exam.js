const mongoose = require('mongoose');
const Question = require('./Question');

const ExamSchema = new mongoose.Schema({

    examID:{
        type: Number,
        required : true
    },
    title:{
        type:String,
        required:true
    },
    teacherID:{
        type:Number,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    questions:[{
        type:Object,
        required:false
    }]

});

const Exam = mongoose.model('Exam',ExamSchema);

module.exports = Exam;