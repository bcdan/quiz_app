const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questions');
const {  ensureAuthenticated } = require('../config/auth');

//GET all questions
router.get('/',ensureAuthenticated,QuestionsController.getQuestions);

router.post('/',ensureAuthenticated,QuestionsController.addQuestion);

//GET one question by ID
router.get('/:id',ensureAuthenticated,QuestionsController.getOneQuestion);

router.get('/byexam/:id',QuestionsController.getByExam);

//Update a question by id
router.put('/:id',ensureAuthenticated,QuestionsController.updateQuestion);

//delete a question
router.delete('/:id',ensureAuthenticated,QuestionsController.deleteQuestion);

//get questions from external api

router.get('/api/get',ensureAuthenticated,QuestionsController.getFromApi);

//add bulk of questions from external api

router.post('/api/post',ensureAuthenticated,QuestionsController.addBulk);




module.exports = router;