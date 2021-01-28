const express = require('express');
const router = express.Router();
const TeachersController = require('../controllers/teachers');


//GET all Teachers
router.get('/',TeachersController.getTeachers);

//GET teacher by id
router.get('/:id',TeachersController.getOneTeacher);

//Update teacher by id
router.put('/:id',TeachersController.updateTeacher);

//delete a teacher
router.delete('/:id',TeachersController.deleteTeacher);



module.exports = router;