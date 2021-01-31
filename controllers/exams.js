const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.getExams = async (req,res)=>{

    try{
        const exams = await Exam.find();
        for(let exam of exams){
            for(let i = exam.questions.length-1 ; i >=0;i--){
                if(!await Question.exists({_id:exam.questions[i]})){
                    exam.questions.splice(i,1);
                }
            }
            await exam.save();
        }
            res.status(200).json(exams);

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.addExam = async (req,res)=>{
    console.log(req.body);
    const exam = new Exam({
        title:req.body.title,
        teacherID:req.body.teacherID,
        duration:req.body.duration,
        date:req.body.date,
        questions:req.body.questions
    });
    try{
        const newExam = await exam.save();
        res.status(201).json(newExam);

    }catch(err){
        res.status(400).json({message:err.message});
    }
};

exports.getOneExam = async (req,res)=>{
    try{
        const _id = req.params.id;
        const exam = await Exam.findOne({_id});
        if(!exam){
            res.status(404).json({message:"couldn't find exam with this id"});
        }else{
            res.status(200).json(exam);
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateExam = async (req,res)=>{
    try{
        const _id = req.params.id;
        const {title,teacherID,duration,date,questions} = req.body

        let exam = await Exam.findOne({_id});
        if(!exam){
            exam = await Exam.create({
                title,
                teacherID,
                duration,
                date,
                questions
            });
            res.status(201).json(exam);
        }else{
            if(title!=null)
                exam.title=title;
            if(duration!=null)
                exam.duration=duration;
            if(date!=null)
                exam.date=date;
            if(questions!=null)
                exam.questions=questions;
            await exam.save();
            res.status(200).json(exam);
        }

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.deleteExam = async (req,res)=>{
    try{
        const _id = req.params.id;
        const exam = await Exam.deleteOne({_id});
        if(exam.deletedCount ===0){
            res.status(404).json();
        }else{
            res.json({message:"removed exam"});
        }
    }catch(err){
        res.status(500).json({"message":err.message});

    }
};