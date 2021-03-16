import {LOGIN_SUCCESS,LOGIN_FAIL,LOGIN_REQUEST,LOG_OUT, LOAD_PROOFILE} from '../actiontype';
const initalstate = {
    accessToken:sessionStorage.getItem("ytc-accessToken") ? sessionStorage.getItem("ytc-accessToken") : null,
    user:sessionStorage.getItem("ytc-user") ? JSON.parse(sessionStorage.getItem("ytc-user")) : null,
    loading:false
}


export const authreducer = (prevstate=initalstate,action)=>{
    const {type,payload} = action;
    switch(type){
        case LOGIN_REQUEST:
            return {...prevstate,loading:true};
        case LOGIN_SUCCESS:
            return {...prevstate,accessToken:payload,loading:false};
        case LOGIN_FAIL:
            return {...prevstate,accessToken:null,loading:false};
        case LOAD_PROOFILE:
            return {...prevstate,user:payload,loading:false};
        case LOG_OUT:
            return {...prevstate,user:null,accessToken:null};
        default:
            return prevstate;
    }   
}