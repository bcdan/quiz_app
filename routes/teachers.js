const express = require('express');
const router = express.Router();
const TeachersController = require('../controllers/teachers');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');
const {getExamsByTeacher,getSingleExam,getQuestionsFromExam,getScoresByExam} = require('./middlewares');

// Login Page
router.get('/login', ensureNotAuthenticated,TeachersController.getLoginPage );

// Register Page - ADD teacher
router.get('/register',ensureNotAuthenticated, TeachersController.getRegisterPage );

// Register
router.post('/register', ensureNotAuthenticated, TeachersController.registerTeacher);

//login handle
router.post('/login',ensureNotAuthenticated, TeachersController.handleLogin);

//logout handle
router.get('/logout', TeachersController.handleLogout);

//teacher's exams page on dashboard
router.get('/myexams/:id',ensureAuthenticated,getExamsByTeacher,TeachersController.myExams);

//edit-exam page
router.get('/editexam/:id',ensureAuthenticated,getSingleExam,getQuestionsFromExam,TeachersController.editExam);

//GET all Teachers
router.get('/',ensureAuthenticated,TeachersController.getTeachers);

//GET Stats
router.get('/stats',ensureAuthenticated,getExamsByTeacher, TeachersController.getStats);

//get all grades by student
router.get('/getgrades/bystudent/:id',TeachersController.gradesByStudent);

//get all grades by exam id
router.get('/getgrades/byexam/:id',getSingleExam,getScoresByExam,TeachersController.gradesByExam);

//GET teacher by id
router.get('/:id',ensureAuthenticated,TeachersController.getOneTeacher);

//Update teacher by id
router.put('/:id',ensureAuthenticated,TeachersController.updateTeacher);

//delete a teacher
router.delete('/:id',ensureAuthenticated,TeachersController.deleteTeacher);






module.exports = router;