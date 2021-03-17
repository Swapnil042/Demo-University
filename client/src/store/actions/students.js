import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStudentStart = ()=>{
    return{
        type: actionTypes.LOAD_STUDENT_START
    }
}
const loadStudentSuccess = (students)=>{
    return{
        type: actionTypes.LOAD_STUDENT_SUCCESS,
        students
    }
}
const loadStudentFail = (error)=>{
    return{
        type: actionTypes.LOAD_STUDENT_FAIL,
        error
    }
}
export const loadStudents = ()=>{
    return dispatch =>{
        dispatch(loadStudentStart());
        const token = localStorage.getItem('token');
        
        const url = 'http://localhost:5000/student';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(url, config)
            .then(res=>{
                dispatch(loadStudentSuccess(res.data.allStudent))
            }).catch(err => {
                dispatch(loadStudentFail(err.response.data));
            });
    }
}