import { createStore, applyMiddleware,combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {authreducer} from './reducers/auth.reducer';
import {homevideosreducer,selectedvideoreducer,releatedVideosReducer,getVideoBySearchReducer,channelSubscriptionReducer} from './reducers/video.reducer';
import {getchannelinforeducer} from './reducers/channel.reducer';
import {getcommentreducer} from './reducers/comment.reducer';

const reducer = (initialState) => initialState;

const rootReducer = combineReducers({
    authreducer,
    homeVideos:homevideosreducer,
    selectvideo:selectedvideoreducer,
    channelDetails:getchannelinforeducer,
    commentlist:getcommentreducer,
    releatedVideo:releatedVideosReducer,
    searchVideo:getVideoBySearchReducer,
    channelSubscription:channelSubscriptionReducer,    
})

const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
);


export default store;