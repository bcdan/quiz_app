const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const IndexController = require('../controllers/index');

// GET for '/'

router.get('/',IndexController.getHomePage);

router.get('/dashboard',ensureAuthenticated,IndexController.getDashboard);



module.exports = router;