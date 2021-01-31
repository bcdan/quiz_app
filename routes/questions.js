const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions');


//GET all questions
router.get('/',QuestionsController.getQuestions);

router.post('/',QuestionsController.addQuestion);

//GET one question by ID
router.get('/:id',QuestionsController.getOneQuestion);

router.get('/byexam/:id',QuestionsController.getByExam);

//Update a question by id
router.put('/:id',QuestionsController.updateQuestion);

//delete a question
router.delete('/:id',QuestionsController.deleteQuestion);

router.get('/getquestions/api',QuestionsController.getFromApi);



module.exports = router;