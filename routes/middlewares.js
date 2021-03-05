const Exam = require('../models/Exam.js');
const Teacher = require('../models/Teacher.js');
const Question = require('../models/Question.js');


module.exports = {
    getExamsByTeacher: async function (req, res, next) {
        let exams;
        try {
            const _id = req.params.id;
            exams = await Exam.find({
                teacherID: _id
            });
            if (!exams) {
                return res.status(404).json({
                    message: "couldn't find exams with this teacher id"
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
        res.exams = exams;
        next();
    },
    getSingleExam: async function(req,res,next){
        let exam;
        try{
            exam = await Exam.findById(req.params.id);
            if(!exam){
                return res.status(404).json({msg:'Cannot find exam'});
            }
        }catch(err){
            return res.status(500).json({
                message:err.message
            });
        }
        res.exam=exam;
        next();
    }
}