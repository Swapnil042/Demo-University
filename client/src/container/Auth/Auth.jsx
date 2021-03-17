import React, { useState } from 'react';
import {connect} from 'react-redux';

import classes from './Auth.module.css';
import {auth} from '../../store/actions/auth';
import Loader from '../../Components/Loader/Loader';



const Auth = (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    
    const onSubmit=()=>{
        props.onAuth(email, password)
    }
    let loginForm = (
        <>
            <div>
                <p>Email</p>
                <input type='text' value={email} onChange={e=>{
                    setEmail(e.target.value);
                }}/>
            </div>
            <div>
                <p>Password</p>
                <input type='Password' value={password} onChange={e=>{
                    setPassword(e.target.value);
                }}/>
            </div>
            <button className={classes.button} onClick={onSubmit}>Log In</button>
            <p>Don't have an account? <b className={classes.signup}>Sign Up</b></p>
        </>
    );

    if(props.isLoading){
        loginForm = <Loader/>
    }

    return(
        <div className={classes.update}>
            {loginForm}
            {props.ifError ? <p className={classes.invalid}>{props.ifError}</p>:null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      isLoading: state.auth.loading,
      ifError: state.auth.error,
      isAuthenticated: state.auth.token !== null
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (mail, pass) => dispatch( auth(mail, pass) )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)