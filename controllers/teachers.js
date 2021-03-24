const bcrypt = require("bcryptjs");
const passport = require("passport");

// Load Teacher model
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Exam = require("../models/Exam");

exports.getLoginPage = (req, res) => {
  res.render("login", { title: "Login" });
};
exports.getRegisterPage = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.registerTeacher = (req, res) => {
  const { firstName, lastName, username, password, password2 } = req.body;
  let errors = [];

  if (!firstName || !lastName || !username || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      title: "Register",
      errors,
      firstName,
      lastName,
      username,
      password,
      password2,
    });
  } else {
    Teacher.findOne({ username: username }).then((teacher) => {
      if (teacher) {
        errors.push({ msg: "Username already exists" });
        res.render("register", {
          title: "Register",
          errors,
          firstName,
          lastName,
          username,
          password,
          password2,
        });
      } else {
        const newTeacher = new Teacher({
          firstName,
          lastName,
          username,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newTeacher.password, salt, (err, hash) => {
            if (err) throw err;
            newTeacher.password = hash;
            newTeacher
              .save()
              .then(() => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/Teachers/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", function (err, Teacher, info) {
    let errors = [];
    if (err) {
      errors.push({ msg: info.message });
      return res.status(401).render("login", { title: "Login", errors });
    }
    if (!Teacher) {
      errors.push({ msg: info.message });
      return res.status(401).render("login", { title: "Login", errors });
    }
    req.logIn(Teacher, function (err) {
      if (err) {
        errors.push({ msg: info.message });
        return res.status(401).render("login", { title: "Login", errors });
      }
      req.session.save(function () {
        // Known error using express session -> this solves the issue
        return res.status(200).redirect("/dashboard");
      });
    });
  })(req, res, next);
};

exports.handleLogout = (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOneTeacher = async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.findOne({ _id });
    if (!teacher) {
      res.status(404).json({ message: "couldn't find teacher with this id" });
    } else {
      res.status(200).json(teacher);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const _id = req.params.id;
    const { firstName, lastName, username, password } = req.body;

    let teacher = await Teacher.findOne({ _id });
    if (!teacher) {
      res.status(404).json({ message: "couldn't find teacher" });
    } else {
      if (firstName != null) teacher.firstName = firstName;
      if (lastName != null) teacher.lastName = lastName;
      if (username != null) teacher.username = username;
      if (password != null) teacher.password = password;
      await teacher.save();
      res.status(200).json(teacher);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const _id = req.params.id;
    const teacher = await Teacher.deleteOne({ _id });
    if (teacher.deletedCount === 0) {
      res.status(404).json();
    } else {
      res.json({ message: "removed teacher" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myExams = (req, res) => {
  res.render("myexams", { exams: res.exams });
};

exports.editExam = (req,res)=>{
  res.render('editexam',{exam:res.exam,questions:res.questions});
};

exports.getStats = (req,res) =>{
  res.render('stats',{exams:res.exams,layout:'./layouts/stats_layout'});
};

exports.gradesByExam = (req,res)=>{
  res.json({scores:res.scores});
}

exports.gradesByStudent = async (req,res)=>{
  let studentid = req.params.id;
  let examIDArray = [];
  let examObjects = [];
  let gradesArray = [];
  try{
    const studentToFind = await Student.findOne({studentID: studentid});
    examIDArray = studentToFind.exams.map(exam=>exam.examID);
    examObjects = await Exam.find({_id:examIDArray});
    examObjects.forEach(obj=>{
      studentToFind.exams.forEach(exam=>{
        if(exam.examID==obj.id){
          gradesArray.push(exam.score);
        }
      });
    });
    examObjects=examObjects.map(exam=>exam.title);
    res.status(200).json({grades:gradesArray,titles:examObjects});
  }catch(err){
    res.status(500).json({message:err.message});
  }
}



