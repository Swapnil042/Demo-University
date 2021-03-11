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

router.get('/course', auth, (req,res)=>{
    Course.find({})
    .populate("course_created_by_user_id course_updated_by_user_id", "first_name last_name")
    .then(allPost=>{
        res.status(200).json({allPost});
    }).catch(err=>{
        res.status(400).send(e);
    })
})

router.patch('/course/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    
    try{
        const course = await Course.findOne({_id: req.params.id});
        if(!course){
            return res.status(404).send();
        }
        updates.forEach(update => course[updates] = req.body[update]);
        course.course_updated_by_user_id = req.user._id;
        await course.save();
        res.status(200).json({message: "Course Updated Successfully"});
    }catch(e){
        res.status(400).send();
    }
})

module.exports = router;