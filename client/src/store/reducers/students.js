import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    students : []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.LOAD_STUDENT_SUCCESS:
            return{
                students: action.students,
                loading: false,
                error:null
            }
        case actionTypes.LOAD_STUDENT_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.LOAD_STUDENT_FAIL:
            return{
                students:[],
                error: action.error,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;