import React,{useEffect} from 'react';
import {connect} from 'react-redux';

import {loadStudents} from '../../store/actions/students';
import classes from './Students.module.css';
import StudentTable from './StudentTable/StudentTable';
import Loader from '../../Components/Loader/Loader';


const Students = (props)=>{
    const onLoad = props.onLoadStudents;

    useEffect(()=>{
        onLoad();
    },[onLoad]);

    let studentTable = <StudentTable students={props.students}/>
    if(props.loading){
        studentTable = <Loader/>
    }

    return(
        <div className={classes.student}>
            {studentTable}
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        loading: state.student.loading,
        error: state.student.error,
        students: state.student.students
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLoadStudents: ()=> dispatch(loadStudents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students);