const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    //TO DO
    // examID:{
    //     type: Number,
    //     required : true
    // },
    // title:{
    //     type:String,
    //     required:true
    // },
    // teacherID:{
    //     type:Number,
    //     required:true
    // },
    // duration:{
    //     type:Number,
    //     required:true
    // },
    // date:{
    //     type:Date,
    //     required:true
    // }
    // //add questions array

});

const Teacher = mongoose.model('Teacher',TeacherSchema);

module.exports = Teacher;