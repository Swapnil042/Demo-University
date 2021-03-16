const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Course = require('../models/courses');

router.post('/course', auth, async(req, res)=>{
    const {course_title, course_description, course_price,course_rating, course_id} = req.body;
    if(!course_title || !course_description || !course_price || !course_rating || !course_id){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const course = await Course.find({course_id});
        if(course.length !== 0){
            return res.status(422).json({error: "Course already exits. You could update that!!"});
        }

        const newCourse = new Course({
            course_id,
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
    .then(allCourse=>{
        res.status(200).json({allCourse});
    }).catch(err=>{
        res.status(400).send(e);
    })
})

router.get('/course/:id', auth, async(req, res)=>{
    try{
        const course = await Course.findOne({course_id: req.params.id});
        if(!course){
            return res.status(404).send();
        }
        res.status(200).json({course});
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/course/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    
    try{
        const course = await Course.findOne({_id: req.params.id});
        if(!course){
            return res.status(404).send();
        }
        const course_with_id = await Course.findOne({course_id: req.body.course_id});
        if(!course_with_id._id.equals(course._id)){
            return res.status(422).send({error: "There is a course with this ID !!"})
        }
        updates.forEach(update => {
            course[update] = req.body[update];
        });
        course.course_updated_by_user_id = req.user._id;
        await course.save();
        res.status(200).json({message: "Course Updated Successfully"});
    }catch(e){
        res.status(400).send(e);
    }
})

module.exports = router;