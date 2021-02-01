const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    studentID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:false
    },
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

});

const Score = mongoose.model('Score',ScoreSchema);

module.exports = Score;