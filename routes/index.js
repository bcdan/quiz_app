const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/index');

// GET for '/'

router.get('/',IndexController.getHomePage);

router.get('/dashboard',IndexController.getDashboard);



module.exports = router;