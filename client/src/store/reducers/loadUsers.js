import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    users : []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.LOAD_SUCCESS:
            return{
                users: action.users,
                loading: false,
                error:null
            }
        case actionTypes.LOAD_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.LOAD_FAIL:
            return{
                users:[],
                error: action.error,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;