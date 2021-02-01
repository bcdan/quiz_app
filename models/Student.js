const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    studentID:{
        type:Number,
        default:0,
        required:true
    },
    exams:[{
        examID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Exam',
            required:false
        },
        score:{
            type:Number,
            default:0,
            required:false
        }
    }]

});

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;