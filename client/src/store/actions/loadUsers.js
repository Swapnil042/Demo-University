import * as actionTypes from './actionTypes';
import axios from 'axios';

const loadStart = ()=>{
    return{
        type: actionTypes.LOAD_START
    }
}

const loadSuccess = (users)=>{
    return{
        type: actionTypes.LOAD_SUCCESS,
        users
    }
}

const loadFail = (error)=>{
    return{
        type: actionTypes.LOAD_FAIL,
        error
    }
}

export const loadUsers = ()=>{
    return dispatch =>{
        dispatch(loadStart());
        const token = localStorage.getItem('token');
        
        const url = 'http://localhost:5000/alluser';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(url, config)
            .then(res=>{
                dispatch(loadSuccess(res.data.allUser))
            }).catch(err => {
                dispatch(loadFail(err.response.data));
            });
    }
}