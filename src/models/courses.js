const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./users');
const {ObjectId} = mongoose.Schema.Types;


const courseSchema = new mongoose.Schema({
    course_title:{
        type: String,
        required: true
    },
    course_description:{
        type: String,
        required: true
    },
    course_price:{
        type: Number,
        required: true
    },
    course_rating:{
        type: Number,
        min:1,
        max:5,
        required: true
    },
    course_created_by_user_id:{
        type: ObjectId,
        ref: "User",
        required: true
    },
    course_updated_by_user_id:{
        type: ObjectId,
        ref: "User",
    }
}, {timestamps: true,
    autoIndex: true
})

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;