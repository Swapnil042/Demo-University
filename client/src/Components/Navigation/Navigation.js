import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css'

const Navigation = (props)=>{
    let links = null
    if(props.isAuthenticated){
        links = (
            <div className={classes.nav}>
                <Link className={classes.link} to={"/"}>Dash Board</Link>
                <Link className={classes.link} to={"/users"}>All Users</Link>
                <Link className={classes.link} to={"/students"}>Students</Link>
                <Link className={classes.link} to={"/courses"}>Courses</Link>
            </div>
        )
    }
    return(
        <>
            {links}
        </>
    )
}
const mapStateToProps = state=>{
    return{
      isAuthenticated: state.auth.token !== null
    }
}
  
  
export default connect(mapStateToProps)(Navigation);