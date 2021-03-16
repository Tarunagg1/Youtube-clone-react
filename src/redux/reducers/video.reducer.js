import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SECCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS, SET_SUBSCRIPTION_FAIL, SET_SUBSCRIPTION_REQUEST, SET_SUBSCTIPTION_STATUS } from "../actiontype";

let initialstate = {
    videos:[],
    loading:true,
    nextPageToken:null,
    activeCategory:'All'
};

let selectedvideo = {
    video:null,
    loading:null
}

let relatedVideos = {
    relatedVideos:[],
    loading:null
}


let searchVideos = {
    searchVideos:[],
    loading:null
}

let channelsubscription = {
    channelVideos:null,
    loading:null,
}

export const homevideosreducer = (state=initialstate,action)=>{
    const {type,payload} = action;
    switch(type){
        case HOME_VIDEOS_SECCESS:
            return {...state,videos:state.activeCategory === payload.category?[...state.videos,...payload.videos] : payload.videos ,loading:false,nextPageToken:payload.nextPageToken,activeCategory:payload.category};
        case HOME_VIDEOS_REQUEST:
            return state
        case HOME_VIDEOS_FAIL:
            return {...state,loading:false,error:payload};
        case HOME_VIDEOS_REQUEST:
            return {...state,loading:false};
        default:
            return state
    }
}

export const selectedvideoreducer = (state=selectedvideo,action)=>{
    const {type,payload} = action;
    switch(type){
        case SELECTED_VIDEO_FAIL:
            return {...state,loading:false,video:null}
        case SELECTED_VIDEO_SUCCESS:
            return {...state,video:payload,loading:false}
        case SELECTED_VIDEO_REQUEST:
            return {...state,loading:true}
        default:
            return state;
    }
}

export const releatedVideosReducer = (state=relatedVideos,action)=>{
    const {type,payload} = action;
    switch(type){
        case RELATED_VIDEO_REQUEST:
            return {...state,loading:false,relatedVideos:[]}
        case RELATED_VIDEO_SUCCESS:
            return {...state,relatedVideos:payload,loading:false}
        case RELATED_VIDEO_FAIL:
            return {...state,loading:true,relatedVideos:[]}
        default:
            return state;
    }
}

export const getVideoBySearchReducer = (state=searchVideos,action)=>{
    const {type,payload} = action;
    switch(type){
        case SEARCH_VIDEO_REQUEST:
            return {...state,loading:false,searchVideos:[]}
        case SEARCH_VIDEO_SUCCESS:
            return {...state,searchVideos:payload,loading:false}
        case SEARCH_VIDEO_FAIL:
            return {...state,loading:true,searchVideos:[]}
        default:
            return state;
    }
}

export const channelSubscriptionReducer = (state=channelsubscription,action)=>{
    const {type,payload} = action;
    switch(type){
        case SET_SUBSCRIPTION_REQUEST:
            return {...state,loading:false,channelVideos:null}
        case SET_SUBSCTIPTION_STATUS:
            return {...state,channelVideos:payload,loading:false}
        case SET_SUBSCRIPTION_FAIL:
            return {...state,loading:true,channelVideos:null}
        default:
            return state;
    }
}
