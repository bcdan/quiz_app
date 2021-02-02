const express = require('express');
const router = express.Router();
const ExamsController = require('../controllers/exams');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');


//GET all exams
router.get('/',ExamsController.getExams);

//GET one exam
router.get('/:id',ExamsController.getOneExam);

router.post('/',ExamsController.addExam);

//Update an exam
router.put('/:id',ExamsController.updateExam);

//delete an exam
router.delete('/:id',ExamsController.deleteExam);

//post student details 
router.post('/start/postdetails',ExamsController.postStudentDetails);

router.get('/start/studentform',ExamsController.getStudentExamForm);



module.exports = router;