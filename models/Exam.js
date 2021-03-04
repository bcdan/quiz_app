const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    teacherID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        required:false
    },
    duration:{
        type:Number,
        required:false
    },
    date:{
        type:String,
        required:false,
        default : (new Date()).toLocaleDateString('he-IL')
    },
    questions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
        required:false
    }]

});

const Exam = mongoose.model('Exam',ExamSchema);

module.exports = Exam;