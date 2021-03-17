import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart=()=>{
    return{
        type: actionTypes.AUTH_START
    }
};

const authSuccess=(token,first_name, last_name)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token,
        first_name,
        last_name
    }
}

const authFail=(error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error
    }
}

// const logout = ()=>{
//     localStorage.removeItem('token');
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     };
// }

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const url = 'http://localhost:5000/signin';

        axios.post(url, {email, password})
            .then(res=>{
                localStorage.setItem('token', res.data.token);
                dispatch(authSuccess(res.data.token, res.data.user.first_name,  res.data.user.last_name));
            }).catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            });
    };
};

// export const autoAuth = ()=>{
//     return dispatch=>{
//         const token = localStorage.getItem('token');
//         if(!token){

//         }
//     }
// }