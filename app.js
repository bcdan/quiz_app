const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const bodyparser = require('body-parser');
const app = express();

//passport config
require('./config/passport')(passport);

//Load config file
dotenv.config({path: './config/config.env' });

//Connect to DB
connectDB();

app.use(expressLayouts);

//Body parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');

//Express session
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 600000000 },

	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		autoRemove: 'interval',
		autoRemoveInterval: 60 * 24 * 2 // In minutes. Default
	})
}));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.session = req.session;
	res.locals.user = req.user;
	next();
});


//Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'assets')));


//Routes
app.use('/',require('./routes/index'));
app.use('/exams',require('./routes/exams'));
app.use('/questions',require('./routes/questions'));
app.use('/teachers',require('./routes/teachers'));


//404 page
app.use((req, res) => {
	res.status(404).render('404');
});

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
     console.log(`Server running in  ${process.env.NODE_ENV} mode on port ${PORT}`)
);