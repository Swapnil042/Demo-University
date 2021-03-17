import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadCourseStart = ()=>{
    return{
        type: actionTypes.LOAD_COURSE_START
    }
}
const loadCourseSuccess = (courses)=>{
    return{
        type: actionTypes.LOAD_COURSE_SUCCESS,
        courses
    }
}

const loadCourseFail = (error)=>{
    return{
        type: actionTypes.LOAD_COURSE_FAIL,
        error
    }
}
export const loadCourse = ()=>{
    return dispatch =>{
        dispatch(loadCourseStart());
        const token = localStorage.getItem('token');
        
        const url = 'http://localhost:5000/course';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(url, config)
            .then(res=>{
                dispatch(loadCourseSuccess(res.data.allCourse))
            }).catch(err => {
                dispatch(loadCourseFail(err.response.data));
            });
    }
}