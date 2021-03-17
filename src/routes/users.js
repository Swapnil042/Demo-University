const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const User = require('../models/users');
const {jwt_secret} = require('../important');


router.post('/signup', async (req,res)=>{
    const {first_name, last_name, email, password} = req.body;

    if(!first_name || !last_name || !email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const user = await User.findOne({email});
        if(user){
            return res.status(422).json({error: "User Exist with that email"});
        }
        const hashedPass = await bcrypt.hash(password, 8);
        const newUser = new User({
            first_name,
            last_name,
            email,
            password: hashedPass
        })

        await newUser.save();
        res.status(200).json({message: "User Created Successfully"});
    }catch(e){
        if(e.errors.email.message){
            return res.status(422).json({error:e.errors.email.message})
        }
        res.status(400).send(e);
        console.log(e);
    }
});

router.post('/signin', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Invalid Email or password"});
    }
    try{
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if(!doMatch){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }
        
        const token = jwt.sign({_id: user._id}, jwt_secret);
        const {first_name, last_name} = user;
        res.status(200).json({token, user:{first_name, last_name}});
        
    }catch(e){
        res.status(400).send(e);
        console.log(e);
    }
});

router.get('/user/:id', auth, async(req, res)=>{
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            return res.status(404).send();
        }
        res.status(200).json({user});
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/alluser',auth ,async(req,res)=>{
    try{
        const allUser = await User.find({});
        res.status(200).json({allUser});
    }catch(e){
        res.status.send(e);
    }
})

module.exports = router;

