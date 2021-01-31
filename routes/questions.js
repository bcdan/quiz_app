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

//get questions from external api

router.get('/api/get',QuestionsController.getFromApi);

//add bulk of questions from external api

router.post('/api/post',QuestionsController.addBulk);




module.exports = router;