const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Student = require('../models/students');

router.post('/student', auth, async(req, res)=>{
    const {student_name,
            student_id,
            student_grade_level,
            student_university_name,
            student_phone_number,
            student_email,
            student_address,
            student_city,
            student_country} = req.body;
    if(!student_name || !student_id || !student_grade_level || !student_university_name || !student_phone_number || !student_email || !student_address || !student_city || !student_country){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const student = await Student.find({student_id});
        if(!student){
            return res.status(422).json({error: "Student already exits. You could update his/her information!!"});
        }
        const newStudent = new Student(
            {   student_name,
                student_id,
                student_grade_level,
                student_university_name,
                student_phone_number,
                student_email,
                student_address,
                student_city,
                student_country,
                student_created_by_user_id: req.user._id
            })

        await newStudent.save();
        res.status(200).json({message: "Student Information Added Successfully"});
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/student', auth, (req,res)=>{
    Student.find({})
    .populate("student_created_by_user_id student_updated_by_user_id", "first_name last_name")
    .then(allStudent=>{
        res.status(200).json({allStudent});
    }).catch(err=>{
        res.status(400).send(err);
    })
})

router.patch('/student/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    
    try{
        const student = await Student.findOne({_id: req.params.id});
        if(!student){
            return res.status(404).send();
        }
        updates.forEach(update => student[updates] = req.body[update]);
        student.student_updated_by_user_id = req.user._id;
        await student.save();
        res.status(200).json({message: "Student Information Updated Successfully"});
    }catch(e){
        res.status(400).send();
    }
})


module.exports = router;