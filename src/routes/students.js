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
        const studentInfo = await Student.find({student_id});
        const studentInfo_2 = await Student.find({student_email});
        if(studentInfo.length !== 0){
            return res.status(422).json({error: "Student already exits. You could update his/her information!!"});
        }else if(studentInfo_2.length !== 0){
            return res.status(422).json({error: "Another student is using this email too!!"});
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

router.get('/student/:id', auth, async(req, res)=>{
    try{
        const student = await Student.findOne({student_id: req.params.id});
        if(!student){
            return res.status(404).send();
        }
        res.status(200).json({student});
    }catch(e){
        res.status(400).send(e);
    }
})

router.patch('/student/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body);
    
    try{
        const student = await Student.findOne({_id: req.params.id});
        console.log(student);
        if(!student){
            return res.status(404).send();
        }
        const student_with_id = await Student.findOne({student_id: req.body.student_id});
        console.log(student_with_id);
        if(!student_with_id._id.equals(student._id)){
            return res.status(422).send({error: "There is a Student with this ID !!"})
        }
        updates.forEach(update => student[update] = req.body[update]);
        student.student_updated_by_user_id = req.user._id;
        await student.save();
        res.status(200).json({message: "Student Information Updated Successfully"});
    }catch(e){
        res.status(400).send(e);
    }
})


module.exports = router;