const Question = require('../models/Question');
const Exam = require('../models/Exam');

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
            title:req.body.title
        });

        try{
            const newQuestion = await question.save();
            const _id = req.body.examID;
            if(_id){
                const examToUpdate = await Exam.findById({_id});
                examToUpdate.questions.push(newQuestion);
                await examToUpdate.save();
            }

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
        const {examID,choices,title} = req.body

        let question = await Question.findOne({_id});
        if(!question){
            question = await Question.create({
                examID,
                choices,
                title
            });
            res.status(201).json(question);
        }else{
            if(examID!=null)
                question.examID=examID;
            if(choices!=null)
                question.choices=choices;
            if(title!=null)
                question.title=title;
            await question.save();
            res.status(200).json(question);
        }

    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.deleteQuestion = async (req,res)=>{
    try{
        let _id = req.params.id;
      const questionToRemove =  await Question.findByIdAndRemove({_id});
      if(questionToRemove){
          _id= questionToRemove.examID;
        if(_id){
            let findExam =  await Exam.findOne({_id});
            let size = findExam.questions.length;
            for(let i = size-1 ; i>=0;i--){
                if(!await Question.exists({_id:findExam.questions[i]})|| findExam.questions[i].equals(questionToRemove._id)){
                    findExam.questions.splice(i,1);
                }
            }
            await findExam.save();
        }
       res.json({message:"removed question"});
    }
    }catch(err){
        res.status(500).json({"message":err.message});

    }
};


exports.getByExam = async(req,res)=>{
    try{
        let _id = req.params.id;
        const questions = await Question.find({examID:_id})
        res.status(200).json(questions);

    }catch(err){
        res.status(500).json({message:err.message});
    }

};

exports.getFromApi = async (req,res)=>{
    res.render('controlpanel');
};

exports.addBulk = async (req,res)=>{

    const array = req.body;
    try{
        for(const questionReceived of array){
            const question = new Question({
                examID:questionReceived.examID,
                choices:questionReceived.choices,
                title:questionReceived.title
            });
    
            const newQuestion = await question.save();
            const _id = question.examID;
            if(_id){
                const examToUpdate = await Exam.findById({_id});
                examToUpdate.questions.push(newQuestion);
                await examToUpdate.save();
            }
        }

    res.status(201).json({message:"added bulk of questions"});
    
}catch(err){
    res.status(400).json({message:err.message});
}

};

