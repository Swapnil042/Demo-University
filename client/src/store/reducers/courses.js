import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    courses : []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes.LOAD_COURSE_SUCCESS:
            return{
                courses: action.courses,
                loading: false,
                error:null
            }
        case actionTypes.LOAD_COURSE_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actionTypes.LOAD_COURSE_FAIL:
            return{
                courses:[],
                error: action.error,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;