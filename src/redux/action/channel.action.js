import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, SET_SUBSCTIPTION_STATUS } from '../actiontype';
import request from '../../Api';


export const getchannelinfo = (id) => async (dispatch) =>{
    try {
        dispatch({type:CHANNEL_DETAILS_REQUEST});
       const {data} = await  request('/channels',{
            params:{
                part:'snippet,statistics,contentDetails',
                id
            }
        })
        dispatch({type:CHANNEL_DETAILS_SUCCESS,payload:data.items[0]});
    } catch (error) {
        console.log(error.response.data);
        dispatch({type:CHANNEL_DETAILS_FAIL,payload:error.response.data});
    }
}



export const checkSubscriptionStatus = id => async (dispatch, getState) => {
    try {
       const { data } = await request('/subscriptions', {
          params: {
             part: 'snippet',
             forChannelId: id,
             mine: true,
          },
          headers: {
             Authorization: `Bearer ${getState().authreducer.accessToken}`,
          },
       })
       dispatch({type:SET_SUBSCTIPTION_STATUS,payload:data.items.length !== 0})
    } catch (error) {
       console.log(error.response.data)
    }
 }

