const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const Course = require('../models/courses');
const {jwt_secret} = require('../important');

router.post('/course', auth, async(req, res)=>{
    const {course_title, course_description, course_price,course_rating} = req.body;
    if(!course_title || !course_description || !course_price || !course_rating){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const course = await Course.find({course_title});
        if(!course){
            return res.status(422).json({error: "Course already exits. You could update that!!"});
        }

        const newCourse = new Course({
            course_title,
            course_description,
            course_price,
            course_rating,
            course_created_by_user_id: req.user._id
        });

        await newCourse.save();
        res.status(200).json({message: "Course Created Successfully"});
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;