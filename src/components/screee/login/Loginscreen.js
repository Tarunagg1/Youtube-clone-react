import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {login} from '../../../redux/action/auth.action';
import './_loginscreen.scss';


export default function Loginscreen() {
    const dispatch = useDispatch();

    const accessToken = useSelector(state => state.authreducer.accessToken);

    const landelLogin = ()=>{
        dispatch(login());
    }

    const historY = useHistory();

    useEffect(() => {
        if(accessToken){
            historY.push('/');
        }
    }, [accessToken,historY])
    
    return (
        <div>
            <div className="login">
                <div className="login__container">
                    <img
                        src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
                        alt="yt logo"
                        className="header__logo"
                    />
                    <button onClick={landelLogin}>Login With Google</button>
                    <p>This project is made By Tarun Aggarwal</p>
                </div>
            </div>
        </div>
    )
}
