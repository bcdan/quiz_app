const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher")

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    for (let exam of exams) {
      for (let i = exam.questions.length - 1; i >= 0; i--) {
        if (!(await Question.exists({ _id: exam.questions[i] }))) {
          exam.questions.splice(i, 1);
        }
      }
      await exam.save();
    }
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addExam = async (req, res) => {
  console.log(req.body);
  const exam = new Exam({
    title: req.body.title,
    teacherID: req.body.teacherID,
    duration: req.body.duration,
    date: req.body.date,
    questions: req.body.questions,
  });
  try {
    const newExam = await exam.save();
    const _id = exam.teacherID;
    if(_id){
        const teacherToUpdate = await Teacher.findById({_id});
        console.log(teacherToUpdate);
        teacherToUpdate.exams.push(newExam);
        await teacherToUpdate.save();
    }    
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOneExam = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await Exam.findOne({ _id });
    if (!exam) {
      res.status(404).json({ message: "couldn't find exam with this id" });
    } else {
      res.status(200).json(exam);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const _id = req.params.id;
    const { title, teacherID, duration, date, questions } = req.body;

    let exam = await Exam.findOne({ _id });
    if (!exam) {
      exam = await Exam.create({
        title,
        teacherID,
        duration,
        date,
        questions,
      });
      res.status(201).json(exam);
    } else {
      if (title != null) exam.title = title;
      if (duration != null) exam.duration = duration;
      if (date != null) exam.date = date;
      if (questions != null) exam.questions = questions;
      await exam.save();
      res.status(200).json(exam);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const _id = req.params.id;
    const exam = await Exam.deleteOne({ _id });
    if (exam.deletedCount === 0) {
      res.status(404).json();
    } else {
      res.json({ message: "removed exam" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentExamForm = async (req, res) => {
  res.render("exam");
};



exports.postStudentDetails = async (req, res) => {
  const {
    Types: {
      ObjectId: { isValid },
      ObjectId,
    },
  } = require("mongoose");

  try {
    const { studentid, examid } = req.body;
    let documentId =
      examid && isValid(examid) && new ObjectId(examid) == examid
        ? examid
        : null;
    console.log("Documentid", documentId);
    if (!documentId) {
      console.log("not valid id, exiting");
      res.status(404).json({ msg: "Invalid exam id! " });
    } else {
      if (!studentid || !examid) {
        res.status(404).json({ msg: "Please enter all fields" });
      } else {
        const studentToFind = await Student.findOne({
          studentID: studentid,
        }).catch((err) => console.error(err));
        const examToFind = await Exam.findOne({ _id: examid }).catch((err) =>
          console.error(err)
        );
        if (studentToFind) {
          if (studentToFind.exams.some((exam) => exam.examID == examid)) {
            res.status(404).json({ msg: "You already took this exam" });
          } else {
            if (examToFind) {
              studentToFind.exams.push({ examID: examid, score: 0 });
              await studentToFind.save().catch((err) => console.error(err));
              res.json(examToFind);
            } else res.status(404).json({ msg: "Exam not found" });
          }
        } else {
          const newStudent = new Student({
            studentID: studentid,
            exams: [{ examID: examid, score: 0 }],
          });
          if (examToFind) {
            newStudent
              .save()
              .then(() => {
                res.json(examToFind);
              })
              .catch((err) => console.log(err));
          } else {
            res.json({ msg: "Exam not found" });
          }
        }
      }
    }
  } catch (error) {}
};


exports.startQuiz = (req,res)=>{

  res.render('startquiz');

};