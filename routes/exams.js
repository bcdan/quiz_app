const express = require('express');
const router = express.Router();
const ExamsController = require('../controllers/exams');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');
const {getExamsByTeacher} = require('./middlewares');


//GET all exams
router.get('/',ensureAuthenticated,ExamsController.getExams);

//Get exams by teacher's ID
router.get('/getbyteacher/:id',getExamsByTeacher,ExamsController.getByTeacher);

//post student details 
router.post('/postdetails',ExamsController.postStudentDetails);

router.get('/studentform',ensureNotAuthenticated,ExamsController.getStudentExamForm);

 router.get('/startquiz',ensureNotAuthenticated,ExamsController.startQuiz);

//get score after student completes an exam
router.post('/submitscore',ExamsController.submitScore);

//GET one exam
router.get('/:id',ensureAuthenticated,ExamsController.getOneExam);

//Add one exam
router.post('/',ensureAuthenticated,ExamsController.addExam);

//Update an exam
router.put('/:id',ensureAuthenticated,ExamsController.updateExam);

//delete an exam
router.delete('/:id',ensureAuthenticated,ExamsController.deleteExam);




module.exports = router;