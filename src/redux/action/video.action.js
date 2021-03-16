import {HOME_VIDEOS_REQUEST, HOME_VIDEOS_SECCESS,SELECTED_VIDEO_SUCCESS,SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_FAIL, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SET_SUBSCRIPTION_STATUS, SET_SUBSCRIPTION_REQUEST, SET_SUBSCRIPTION_FAIL } from "../actiontype"
import request from '../../Api';


export const getpopularvideos = ()=>async (dispatch,getState) => {
    try {
        dispatch({type:HOME_VIDEOS_REQUEST});
        const {data} = await request('/videos', {
            params: {
               part: 'snippet,contentDetails,statistics',
               chart: 'mostPopular',
               regionCode: 'IN',
               maxResults: 20,
               pageToken: getState().homeVideos.nextPageToken,
            },
         })
   
        dispatch({
            type:HOME_VIDEOS_SECCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:'All'
            }
        })     
    } catch (error) {
        console.log(error);
    }
}

export const getvideosByCategory = (keyword)=>async (dispatch,getState) => {
    try {
        dispatch({type:HOME_VIDEOS_REQUEST});
        const {data} = await request('/search', {
            params: {
               part: 'snippet',
               maxResults: 20,
               pageToken: getState().homeVideos.nextPageToken,
               q:keyword,
               type:'video'
            },
         })
   
        dispatch({
            type:HOME_VIDEOS_SECCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:keyword
            }
        })     
    } catch (error) {
        console.log(error);
    }
}

export const getvideobyid = (id) => async (dispatch) =>{
    try {
        dispatch({type:SELECTED_VIDEO_REQUEST});
       const {data} = await  request('/videos',{
            params:{
                part:'snippet,statistics',
                id:id
            }
        })
        dispatch({type:SELECTED_VIDEO_SUCCESS,payload:data.items[0]});
    } catch (error) {
        console.log(error.message);
        dispatch({type:SELECTED_VIDEO_FAIL,payload:error.message});
    }
}

export const getrelatedvideos = (id) => async (dispatch) =>{
    try {
        dispatch({type:RELATED_VIDEO_REQUEST});
       const {data} = await  request('/search',{
            params:{
                part:'snippet',
                relatedTOVideoId:id,
                maxResults:20,
                types:'video'
            }
        })
        dispatch({type:RELATED_VIDEO_SUCCESS,payload:data.items});
    } catch (error) {
        console.log(error.message);
        dispatch({type:RELATED_VIDEO_FAIL,payload:error.message});
    }
}



export const getvideosBySearch = (keyword)=>async (dispatch) => {
    try {
        dispatch({type:SEARCH_VIDEO_REQUEST});
        const {data} = await request('/search', {
            params: {
               part: 'snippet',
               maxResults: 20,
               q:keyword,
               type:'video,channel'
            },
         })
   
        dispatch({
            type:SEARCH_VIDEO_SUCCESS,
            payload:data.items
        })     
    } catch (error) {
        console.log(error);
        dispatch({type:SEARCH_VIDEO_FAIL,payload:error.message});
    }
}




export const getVideosByChannel = id => async (dispatch, getState) => {
    dispatch({type: SET_SUBSCRIPTION_REQUEST})
    try {
       const { data } = await request('/subscriptions', {
          params: {
             part: 'snippet',
             mine: true,
          },
          headers: {
             Authorization: `Bearer ${getState().authreducer.accessToken}`,
          },
       })
       dispatch({
          type: SET_SUBSCRIPTION_STATUS,
          payload: data.items.length !== 0,
       })
       console.log(data)
    } catch (error) {
       console.log(error.response.data)
       dispatch({type:SET_SUBSCRIPTION_FAIL,payload:error.response.data});
     
    }
 }

