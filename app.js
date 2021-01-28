const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const bodyparser = require('body-parser');
const app = express();


//Load config file
dotenv.config({path: './config/config.env' });

//Connect to DB
connectDB();

app.use(expressLayouts);

//Body parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'assets')));


//Routes
app.use('/',require('./routes/index'));
app.use('/exams',require('./routes/exams'));
app.use('/questions',require('./routes/questions'));
app.use('/teachers',require('./routes/teachers'));


//404 page
// app.use((req, res) => {
// 	res.status(404).render('404', { layout:'/views/layouts/main.ejs' });
// });

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
     console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`)
);