import React,{useEffect} from 'react';
import {connect} from 'react-redux';

import {loadCourse} from '../../store/actions/courses';
import classes from './Courses.module.css';
import CourseTable from './CourseTable/CourseTable';
import Loader from '../../Components/Loader/Loader';


const Students = (props)=>{
    const onLoad = props.onLoadCourses;

    useEffect(()=>{
        onLoad();
    },[onLoad]);

    let courseTable = <CourseTable courses={props.courses}/>
    if(props.loading){
        courseTable = <Loader/>
    }

    return(
        <div className={classes.course}>
            {courseTable}
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        loading: state.course.loading,
        error: state.course.error,
        courses : state.course.courses
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLoadCourses: ()=> dispatch(loadCourse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);