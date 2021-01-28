const Question = require('../models/Question');

exports.getQuestions = async (req,res)=>{
    try{
        const questions = await Question.find();
        res.status(200).json(questions);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.addQuestion =async (req,res)=>{

        const question = new Question({
            examID:req.body.examID,
            choices:req.body.choices,
            title:req.body.title,
            points:req.body.points
        });
        try{
            const newQuestion = await question.save();
            res.status(201).json(newQuestion);

        }catch(err){
            res.status(400).json({message:err.message});
        }

};

exports.getOneQuestion = async (req,res)=>{
    try{
        const _id = req.params.id;
        const question = await Question.findOne({_id});
        if(!question){
            res.status(404).json({message:"couldn't find question with this id"});
        }else{
            res.status(200).json(question);
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateQuestion = async (req,res)=>{
    try{
        const _id = req.params.id;
        const {examID,choices,title,points} = req.body

        let question = await Question.findOne({_id});
        if(!question){
            question = await Question.create({
                examID,
                choices,
                title,
                points
            });
            res.status(201).json(question);
        }else{
            if(examID!=null)
                question.examID=examID;
            if(choices!=null)
                question.choices=choices;
            if(title!=null)
                question.title=title;
            if(points!=null)
                question.points=points;
            await question.save();
            res.status(200).json(question);
        }

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.deleteQuestion = async (req,res)=>{
    try{
        const _id = req.params.id;
        const question = await Question.deleteOne({_id});
        if(question.deletedCount ===0){
            res.status(404).json();
        }else{
            res.json({message:"removed question"});
        }
    }catch(err){
        res.status(500).json({"message":err.message});

    }
};