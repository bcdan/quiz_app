const express = require('express');
const router = express.Router();
const TeachersController = require('../controllers/teachers');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');
const {getExamsByTeacher,getSingleExam,getQuestionsFromExam} = require('./middlewares');

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
router.get('/',TeachersController.getTeachers);


//GET teacher by id
router.get('/:id',TeachersController.getOneTeacher);

//Update teacher by id
router.put('/:id',TeachersController.updateTeacher);

//delete a teacher
router.delete('/:id',TeachersController.deleteTeacher);




module.exports = router;