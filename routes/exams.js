const express = require('express');
const router = express.Router();
const ExamsController = require('../controllers/exams');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');
const {getExamsByTeacher} = require('./middlewares');


//GET all exams
router.get('/',ExamsController.getExams);

//Get exams by teacher's ID
router.get('/getbyteacher/:id',getExamsByTeacher,ExamsController.getByTeacher);

//GET one exam
router.get('/:id',ExamsController.getOneExam);

//Add one exam
router.post('/',ExamsController.addExam);

//Update an exam
router.put('/:id',ExamsController.updateExam);

//delete an exam
router.delete('/:id',ExamsController.deleteExam);

//post student details 
router.post('/start/postdetails',ExamsController.postStudentDetails);

router.get('/start/studentform',ExamsController.getStudentExamForm);

router.get('/start/startquiz',ExamsController.startQuiz);


module.exports = router;