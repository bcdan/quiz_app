const express = require('express');
const router = express.Router();
const ExamsController = require('../controllers/exams');
const { ensureNotAuthenticated , ensureAuthenticated } = require('../config/auth');


//GET all exams
router.get('/',ensureAuthenticated,ExamsController.getExams);

//GET one exam
router.get('/:id',ExamsController.getOneExam);

router.post('/',ensureAuthenticated,ExamsController.addExam);

//Update an exam
router.put('/:id',ensureAuthenticated,ExamsController.updateExam);

//delete an exam
router.delete('/:id',ensureAuthenticated,ExamsController.deleteExam);



module.exports = router;