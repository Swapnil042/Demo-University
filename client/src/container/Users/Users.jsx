import React,{useEffect} from 'react';
import {connect} from 'react-redux';

import {loadUsers} from '../../store/actions/loadUsers';
import classes from './Users.module.css';
import UserTable from './UserTable/UserTable';
import Loader from '../../Components/Loader/Loader';


const Users = (props)=>{

    const onLoad = props.onLoadUsers;
    useEffect(()=>{
        onLoad();
    },[onLoad]);

    let userTable = <UserTable users={props.users}/>
    if(props.loading){
        userTable = <Loader/>
    }

    return(
        <div className={classes.user}>
            {userTable}
        </div>
    )
}

const mapStateToProps = state=>{
    return{
        loading: state.user.loading,
        error: state.user.error,
        users: state.user.users
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        onLoadUsers: ()=> dispatch(loadUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);