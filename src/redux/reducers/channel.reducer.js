import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCTIPTION_STATUS } from '../actiontype';

let channelDetails = {
    channel:{},
    loading:false,
    subscriptionStatus:false
}


export const getchannelinforeducer = (state=channelDetails,action)=>{
    const {type,payload} = action;
    switch(type){
        case CHANNEL_DETAILS_REQUEST:
            return {...state,loading:false}
        case CHANNEL_DETAILS_SUCCESS:
            return {...state,channel:payload,loading:false}
        case CHANNEL_DETAILS_FAIL:
            return {...state,loading:true,channel:{}}
        case SET_SUBSCTIPTION_STATUS:
            return {...state,subscriptionStatus:payload};
        default:
            return state;
    }
}
