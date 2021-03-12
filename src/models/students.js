const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./users');
const {ObjectId} = mongoose.Schema.Types;


const studentSchema = new mongoose.Schema({
    
    student_name:{
        type: String,
        required: true
    },
    student_id:{
        type: Number,
        required: true,
        unique: true
    },
    student_grade_level:{
        type: String,
        required: true
    },
    student_university_name:{
        type: String,
        required: true
    },
    student_phone_number:{
        type: Number,
        required: true
    },
    student_email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    student_address:{
        type: String,
        required: true
    },
    student_city:{
        type: String,
        required: true
    },
    student_country:{
        type: String,
        required: true
    },
    student_created_by_user_id:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    student_updated_by_user_id:{
        type: ObjectId,
        ref: "User",
    }
}, {timestamps: true})

const Student = mongoose.model("Students", studentSchema);

module.exports = Student;