const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')


const {dbUrl} = require('./important');
const userRouter = require('./routes/users');
const courseRouter = require('./routes/courses');
const studentRoute = require('./routes/students');


const app = express();
const PORT = 5000

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("conneted to db")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
});
app.use(cors())
app.use(express.json());
app.use(userRouter);
app.use(courseRouter);
app.use(studentRoute);

app.listen(PORT, ()=>{
    console.log("Server is running on Port: ", PORT);
})