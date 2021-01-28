const Exam = require('../models/Exam');

exports.getExams = async (req,res)=>{

    try{
        const exams = await Exam.find();
        res.status(200).json(exams);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.addExam = async (req,res)=>{
    const exam = new Exam({
        examID:req.body.examID,
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
        const {examID,title,teacherID,duration,date,questions} = req.body

        let exam = await Exam.findOne({_id});
        if(!exam){
            exam = await Exam.create({
                examID,
                title,
                teacherID,
                duration,
                date,
                questions
            });
            res.status(201).json(exam);
        }else{
            if(examID!=null)
                exam.examID=examID;
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