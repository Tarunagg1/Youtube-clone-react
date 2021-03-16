import firebase from 'firebase';
import auth from '../../firebase';
import {LOGIN_SUCCESS,LOGIN_REQUEST, LOAD_PROOFILE, LOGIN_FAIL, LOG_OUT} from '../actiontype';


export const login = () => async dispatch => {
    try {
        dispatch({type:LOGIN_REQUEST})
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
        
        const res = await auth.signInWithPopup(provider);
        const accesstoken = res.credential.accessToken;
        const profile = {
            name : res.additionalUserInfo.profile.name,
            picture : res.additionalUserInfo.profile.picture,
        }
        sessionStorage.setItem("ytc-accessToken",accesstoken);
        sessionStorage.setItem("ytc-user",JSON.stringify(profile));
        
        dispatch({type:LOGIN_SUCCESS,payload:accesstoken});
        dispatch({type:LOAD_PROOFILE,payload:profile});

    } catch (error) {
        console.log(error.message);
        dispatch({type:LOGIN_FAIL,payload:error.message});        
    }
}


export const logout = ()=> async dispatch =>{
    await auth.signOut();
    dispatch({type:LOG_OUT});
    sessionStorage.removeItem("ytc-accessToken");
    sessionStorage.removeItem("ytc-user");
}