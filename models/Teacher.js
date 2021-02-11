const mongoose = require('mongoose');
const TeacherSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	exams:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Exam',
            required:false
    }]
	
	

});
const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
