import { CHANNEL_DETAILS_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SECCESS } from "../actiontype";

let commentstate = {
    loading:false,
    comments:null
};

export const getcommentreducer = (state=commentstate,action)=>{
    const {type,payload} = action;
    switch(type){
        case COMMENT_LIST_REQUEST:
            return {...state,loading:true}
        case COMMENT_LIST_SECCESS:
            return {...state,comments:payload,loading:false}
        case CHANNEL_DETAILS_FAIL:
            return {...state,loading:false,comments:null}
        default:
            return state;
    }
}