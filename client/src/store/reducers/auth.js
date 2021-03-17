import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: null,
    first_name: '',
    last_name: ''
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START: 
            return{
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                token: action.token,
                error: null,
                loading: false,
                first_name: action.first_name,
                last_name: action.last_name
            }
        case actionTypes.AUTH_FAIL:
            return {
                token: null,
                first_name:'',
                last_name:'',
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                token: null,
                error: null,
                loading: null,
                first_name: '',
                last_name: ''
            }
        default:
            return state;
    }
}

export default reducer;